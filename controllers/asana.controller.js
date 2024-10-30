const {
  getAsanasFromCache,
  isAsanasCacheEmpty,
  updateAsanaInCache,
  removeAsanaFromCache
} = require('../cache')

const db = require('../models')

const {deleteFileFromS3} = require('../controllers/s3.controller')

// Основная модель
const Asana = db.asanas
const AsanaByGroup = db.asanaByGroups
const Pirs = db.pirs
const ContinuingAsana = db.continuingAsanas
const AsanaGroups = db.asanasGroups

const BUCKET_HOST = `${process.env.S3_BUCKET_NAME}.s3.timeweb.cloud`
const MY_SITE_CDN_ADDRESS = 'cdn.sequoia-flow.ru'

// Создание асаны
const createAsana = async (req, res) => {
  const {
    groups = '[]',
    pirs = [],
    continuingAsanas = [],
    ...restBody
  } = req.body

  if (req.file?.location) {
    restBody.image = req.file.location.replace(BUCKET_HOST, MY_SITE_CDN_ADDRESS)
  }

  const asana = await Asana.create(restBody)

  await Promise.all([
    AsanaByGroup.bulkCreate(
      JSON.parse(groups).map((groupId) => ({asanaId: asana.id, groupId}))
    ),

    ContinuingAsana.bulkCreate(
      continuingAsanas.map((continuingAsanaId) => ({
        asanaId: asana.id,
        continuingAsanaId
      }))
    ),

    Pirs.bulkCreate(pirs.map((pirId) => ({asanaId: asana.id, pirId})))
  ])

  if (!isAsanasCacheEmpty()) {
    const asanaModel = await Asana.findByPk(asana.id, {
      include: [
        {
          model: AsanaGroups,
          as: 'groups',
          attributes: ['id', 'name', 'categoryId'],
          through: {attributes: []}
        },
        {
          model: Pirs,
          as: 'pirs',
          attributes: ['pirId', 'title']
        },
        {
          model: ContinuingAsana,
          as: 'continuingAsanas',
          attributes: ['continuingAsanaId']
        }
      ]
    })

    updateAsanaInCache({
      ...asanaModel.get({plain: true}),
      pirs: asanaModel.pirs.map(({pirId}) => pirId),
      continuingAsanas: asanaModel.continuingAsanas.map(
        ({continuingAsanaId}) => continuingAsanaId
      )
    })
  }

  res.status(200).send(asana)
}

// Получить список асан
const getAllAsanas = async (_, res) => {
  let asanas = []

  if (isAsanasCacheEmpty()) {
    const result = await Asana.findAll({
      include: [
        {
          model: AsanaGroups,
          as: 'groups',
          attributes: ['id', 'name', 'categoryId'],
          through: {attributes: []}
        },
        {
          model: Pirs,
          as: 'pirs',
          attributes: ['pirId', 'title']
        },
        {
          model: ContinuingAsana,
          as: 'continuingAsanas',
          attributes: ['continuingAsanaId']
        }
      ]
    })

    asanas = result.map((asana) => ({
      ...asana.get({plain: true}),
      pirs: asana.pirs.map(({pirId}) => pirId),
      continuingAsanas: asana.continuingAsanas.map(
        ({continuingAsanaId}) => continuingAsanaId
      )
    }))
  } else {
    asanas = Object.values(getAsanasFromCache())
  }

  res.status(200).send(asanas)
}

// Получить асану
const getAsana = async (req, res) => {
  const {id} = req.params

  const asana = await Asana.findOne({where: {id}})

  if (asana) {
    res.status(200).send(asana)
  } else {
    res.status(404).send()
  }
}

// Обновить асану
const updateAsana = async (req, res) => {
  const {id} = req.params

  const {
    groups = '[]',
    pirs = [],
    continuingAsanas = [],
    ...restBody
  } = req.body

  if (req.file?.location) {
    restBody.image = req.file.location.replace(BUCKET_HOST, MY_SITE_CDN_ADDRESS)
  }

  const asanaFromDB = await Asana.findOne({where: {id}})

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

  await Promise.all([
    AsanaByGroup.destroy({where: {asanaId: id}}),
    ContinuingAsana.destroy({where: {asanaId: id}}),
    Pirs.destroy({where: {asanaId: id}}),

    AsanaByGroup.bulkCreate(
      JSON.parse(groups).map((groupId) => ({asanaId: id, groupId}))
    ),

    Pirs.bulkCreate(pirs.map((pirId) => ({asanaId: id, pirId}))),

    ContinuingAsana.bulkCreate(
      continuingAsanas.map((continuingAsanaId) => ({
        asanaId: id,
        continuingAsanaId
      }))
    )
  ])

  const asana = await asanaFromDB.update(restBody)

  if (!isAsanasCacheEmpty()) {
    const asanaModel = await Asana.findByPk(id, {
      include: [
        {
          model: AsanaGroups,
          as: 'groups',
          attributes: ['id', 'name', 'categoryId'],
          through: {attributes: []}
        },
        {
          model: Pirs,
          as: 'pirs',
          attributes: ['pirId', 'title']
        },
        {
          model: ContinuingAsana,
          as: 'continuingAsanas',
          attributes: ['continuingAsanaId']
        }
      ]
    })

    updateAsanaInCache({
      ...asanaModel.get({plain: true}),
      pirs: asanaModel.pirs.map(({pirId}) => pirId),
      continuingAsanas: asanaModel.continuingAsanas.map(
        ({continuingAsanaId}) => continuingAsanaId
      )
    })
  }

  // TODO 404
  res.status(200).send(asana)
}

// Удалить асану
const deleteAsana = async (req, res) => {
  const {id} = req.params

  const asanaFromDB = await Asana.findOne({where: {id}})

  if (asanaFromDB.image) {
    await deleteFileFromS3(
      asanaFromDB.image.replace(`https://${MY_SITE_CDN_ADDRESS}/`, '')
    )
  }

  await asanaFromDB.destroy()

  removeAsanaFromCache(id)

  res.status(200).send({})
}

module.exports = {
  deleteAsana,
  updateAsana,
  getAsana,
  getAllAsanas,
  createAsana
}
