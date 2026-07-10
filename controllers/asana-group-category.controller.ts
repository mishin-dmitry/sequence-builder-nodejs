import {Request, Response} from 'express'
import db from '../models'

const AsanasGroupsCategories = db.asanasGroupsCategories
const AsanaGroups = db.asanasGroups

// Создание категории
const createAsanasGroupsCategory = async (req: Request, res: Response) => {
  const asana = await AsanasGroupsCategories.create(req.body)

  res.status(200).send(asana)
}

// Получить категории (+ группы без категории отдельным списком)
const getAllAsanasGroupsCategories = async (_req: Request, res: Response) => {
  const [categories, uncategorizedGroups] = await Promise.all([
    AsanasGroupsCategories.findAll({
      attributes: ['id', 'name'],
      include: {
        model: AsanaGroups,
        as: 'groups',
        attributes: ['id', 'name', 'categoryId', 'alias']
      }
    }),
    AsanaGroups.findAll({
      where: {categoryId: null},
      attributes: ['id', 'name', 'categoryId', 'alias']
    })
  ])

  res.status(200).send({categories, uncategorizedGroups})
}

// Получить группу
const getAsanasGroupsCategory = async (req: Request, res: Response) => {
  const {id} = req.params

  const category = await AsanasGroupsCategories.findOne({where: {id}})

  if (category) {
    res.status(200).send(category)
  } else {
    res.status(404).send()
  }
}

// Обновить категорию
const updateAsanasGroupsCategory = async (req: Request, res: Response) => {
  const {id} = req.params

  const asana = await AsanasGroupsCategories.update(req.body, {where: {id}})

  // TODO 404
  res.status(200).send(asana)
}

// Удалить группу
const deleteAsanasGroupsCategory = async (req: Request, res: Response) => {
  const {id} = req.params

  await AsanasGroupsCategories.destroy({where: {id}})

  res.status(200).send({})
}

export {
  deleteAsanasGroupsCategory,
  updateAsanasGroupsCategory,
  getAsanasGroupsCategory,
  getAllAsanasGroupsCategories,
  createAsanasGroupsCategory
}
