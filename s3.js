const {S3Client, DeleteObjectCommand} = require('@aws-sdk/client-s3')
const dotenv = require('dotenv')

dotenv.config()

const s3Client = new S3Client({
  region: process.env.S3_REGION,
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  }
})

module.exports = {s3Client, DeleteObjectCommand}
