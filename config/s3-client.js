const { S3 } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");

dotenv.config();

console.log("s3 conf", {
  endpoint: process.env.DO_SPACES_URL,
  region: process.env.DO_SPACES_REGION,
  forcePathStyle: false,
  credentials: {
    accessKeyId: process.env.DO_CDN_ACCESS_KEY,
    secretAccessKey: process.env.DO_CDN_SECRET_ACCESS_KEY,
  },
});

const s3Client = new S3({
  endpoint: process.env.DO_SPACES_URL,
  region: process.env.DO_SPACES_REGION,
  forcePathStyle: false,
  credentials: {
    accessKeyId: process.env.DO_CDN_ACCESS_KEY,
    secretAccessKey: process.env.DO_CDN_SECRET_ACCESS_KEY,
  },
});

module.exports = s3Client;
