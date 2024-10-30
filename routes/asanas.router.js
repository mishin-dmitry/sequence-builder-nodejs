const {Router} = require('express')
const {uploadFileToS3} = require('../controllers/s3.controller')

const {
  createAsana,
  deleteAsana,
  getAllAsanas,
  getAsana,
  updateAsana
} = require('../controllers/asana.controller')

const router = Router()

router.post('/create', uploadFileToS3.single('image'), createAsana)
router.put('/:id', uploadFileToS3.single('image'), updateAsana)
router.get('/getAll', getAllAsanas)
router.delete('/:id', deleteAsana)
router.get('/:id', getAsana)

module.exports = router
