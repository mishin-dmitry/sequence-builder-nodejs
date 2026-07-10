import db from './models'

const Asanas = db.asanas
const AsanaGroups = db.asanasGroups

interface AsanaAttributes {
  id: number
  name: string
  description: string | null
  alias: string
  searchKeys: string | null
  image: string | null
}

type AsanaCache = Record<number, AsanaAttributes>

let asanasCache: AsanaCache = {}
let isCacheLoaded = false

const getAsanasFromCache = () => asanasCache

const updateAsanaInCache = (asana: AsanaAttributes) => {
  asanasCache = {...asanasCache, [asana.id]: asana}
}

const removeAsanaFromCache = (asanaId: number) => {
  delete asanasCache[asanaId]
}

const updateAsanasCache = async () => {
  try {
    const asanas = await Asanas.findAll({
      include: [
        {
          model: AsanaGroups,
          as: 'groups',
          attributes: ['id', 'name', 'categoryId', 'alias'],
          through: {attributes: []}
        }
      ]
    })

    const asanasMap: AsanaCache = {}

    for (let i = 0; i < asanas.length; i++) {
      const asana = asanas[i]

      asanasMap[asana.id] = asana.get({plain: true})
    }

    asanasCache = asanasMap
    isCacheLoaded = true
  } catch (e) {
    // Оставляем предыдущий кэш как есть — лучше отдать чуть устаревшие
    // данные, чем полностью терять кэш из-за временного сбоя БД.
    console.error(e)
  }
}

const isAsanasCacheLoaded = () => isCacheLoaded

export {
  getAsanasFromCache,
  updateAsanasCache,
  isAsanasCacheLoaded,
  updateAsanaInCache,
  removeAsanaFromCache
}
