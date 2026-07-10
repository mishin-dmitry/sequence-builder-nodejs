declare module "multer-s3" {
  import { StorageEngine } from "multer";
  import { S3Client } from "@aws-sdk/client-s3";
  import { Request } from "express";

  type FieldCallback = (error: any, value?: string) => void;

  interface Options {
    s3: S3Client;
    bucket: string | ((req: Request, file: Express.Multer.File, cb: FieldCallback) => void);
    acl?: string;
    key?: (req: Request, file: Express.Multer.File, cb: FieldCallback) => void;
    contentType?: (req: Request, file: Express.Multer.File, cb: FieldCallback) => void;
  }

  function multerS3(options: Options): StorageEngine;

  export = multerS3;
}
