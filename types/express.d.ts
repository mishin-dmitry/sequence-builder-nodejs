export interface UserAttributes {
  id: number;
  email: string;
  password: string;
}

declare global {
  namespace Express {
    interface Request {
      userId?: number | null;
      user?: UserAttributes | null;
    }

    namespace Multer {
      interface File {
        /** multer-s3 only: full public URL of the uploaded object. */
        location?: string;
        /** multer-s3 only: S3 object key. */
        key?: string;
        /** multer-s3 only: name of the bucket the object was uploaded to. */
        bucket?: string;
      }
    }
  }
}
