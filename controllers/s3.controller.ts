import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
import path from "path";
import { s3Client, DeleteObjectCommand } from "../s3";

dotenv.config();

const uploadFileToS3 = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.S3_BUCKET_NAME as string,
    acl: "public-read",
    key: (req, file, cb) => {
      const extension = path.extname(file.originalname);

      cb(null, `${req.body.alias}/${req.body.alias}${extension}`);
    },
  }),
});

const deleteFileFromS3 = async (fileName: string) => {
  const deleteCommand = new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
  });

  await s3Client.send(deleteCommand);
};

export { uploadFileToS3, deleteFileFromS3 };
