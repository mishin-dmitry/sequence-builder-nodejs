const {s3Client, DeleteObjectCommand} = require('../s3')
const multer = require('multer')
const multerS3 = require('multer-s3')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

const uploadFileToS3 = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    key: (req, file, cb) => {
      const extension = path.extname(file.originalname)

      cb(null, `${req.body.alias}/${req.body.alias}${extension}`)
    }
  })
})

const deleteFileFromS3 = async (fileName) => {
  const deleteCommand = new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName
  })

  await s3Client.send(deleteCommand)
}

module.exports = {uploadFileToS3, deleteFileFromS3}
