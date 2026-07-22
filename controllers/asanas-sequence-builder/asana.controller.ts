import {Request, Response} from 'express'
import {
  getAsanasFromCache,
  isAsanasCacheLoaded,
  updateAsanaInCache,
  removeAsanaFromCache
} from '../../cache'
import db from '../../models'
import {deleteFileFromS3} from '../s3.controller'

// Основная модель
const Asana = db.asanas
const AsanaByGroup = db.asanaByGroups
const AsanaGroups = db.asanasGroups

const BUCKET_HOST = `${process.env.S3_BUCKET_NAME}.s3.timeweb.cloud`
const MY_SITE_CDN_ADDRESS = 'cdn.sequoia-flow.ru'

// Создание асаны
const createAsana = async (req: Request, res: Response) => {
  const {groups = '[]', ...restBody} = req.body

  if (req.file?.location) {
    restBody.image = req.file.location.replace(BUCKET_HOST, MY_SITE_CDN_ADDRESS)
  }

  const asana = await Asana.create(restBody)

  await AsanaByGroup.bulkCreate(
    JSON.parse(groups).map((groupId: number) => ({asanaId: asana.id, groupId}))
  )

  if (isAsanasCacheLoaded()) {
    const asanaModel = await Asana.findByPk(asana.id, {
      include: [
        {
          model: AsanaGroups,
          as: 'groups',
          attributes: ['id', 'name', 'categoryId', 'alias'],
          through: {attributes: []}
        }
      ]
    })

    if (asanaModel) {
      updateAsanaInCache(asanaModel.get({plain: true}))
    }
  }

  res.status(200).send(asana)
}

// Получить список асан
const getAllAsanas = async (_req: Request, res: Response) => {
  let asanas: unknown[] = []

  if (isAsanasCacheLoaded()) {
    asanas = Object.values(getAsanasFromCache())
  } else {
    const result = await Asana.findAll({
      include: [
        {
          model: AsanaGroups,
          as: 'groups',
          attributes: ['id', 'name', 'categoryId', 'alias'],
          through: {attributes: []}
        }
      ]
    })

    asanas = result.map((asana) => asana.get({plain: true}))
  }

  res.status(200).send(asanas)
}

// Получить асану
const getAsana = async (req: Request, res: Response) => {
  const {id} = req.params

  const asana = await Asana.findOne({where: {id}})

  if (asana) {
    res.status(200).send(asana)
  } else {
    res.status(404).send()
  }
}

// Обновить асану
const updateAsana = async (req: Request, res: Response) => {
  const {id} = req.params

  const {groups = '[]', ...restBody} = req.body

  if (req.file?.location) {
    restBody.image = req.file.location.replace(BUCKET_HOST, MY_SITE_CDN_ADDRESS)
  }

  const asanaFromDB = await Asana.findOne({where: {id}})

  if (!asanaFromDB) {
    return res.status(404).send()
  }

  if (asanaFromDB.image !== restBody.image) {
    if (asanaFromDB.image) {
      await deleteFileFromS3(
        asanaFromDB.image.replace(`https://${MY_SITE_CDN_ADDRESS}/`, '')
      )
    }
  }

  if (asanaFromDB.image && !restBody.image) {
    restBody.image = null
  }

  await AsanaByGroup.destroy({where: {asanaId: id}})

  await AsanaByGroup.bulkCreate(
    JSON.parse(groups).map((groupId: number) => ({asanaId: id, groupId}))
  )

  const asana = await asanaFromDB.update(restBody)

  if (isAsanasCacheLoaded()) {
    const asanaModel = await Asana.findByPk(id, {
      include: [
        {
          model: AsanaGroups,
          as: 'groups',
          attributes: ['id', 'name', 'categoryId', 'alias'],
          through: {attributes: []}
        }
      ]
    })

    if (asanaModel) {
      updateAsanaInCache(asanaModel.get({plain: true}))
    }
  }

  res.status(200).send(asana)
}

// Удалить асану
const deleteAsana = async (req: Request, res: Response) => {
  const {id} = req.params

  const asanaFromDB = await Asana.findOne({where: {id}})

  if (!asanaFromDB) {
    return res.status(404).send()
  }

  if (asanaFromDB.image) {
    await deleteFileFromS3(
      asanaFromDB.image.replace(`https://${MY_SITE_CDN_ADDRESS}/`, '')
    )
  }

  await asanaFromDB.destroy()

  removeAsanaFromCache(Number(id))

  res.status(200).send({})
}

export {deleteAsana, updateAsana, getAsana, getAllAsanas, createAsana}
