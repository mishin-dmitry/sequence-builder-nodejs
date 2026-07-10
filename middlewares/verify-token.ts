import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let token: string = req.cookies._sid;

  if (!token) {
    // Если передали куки в getServerSideProps
    const cookiesHeader = req.headers.cookies;

    if (typeof cookiesHeader === "string" && cookiesHeader.includes("_sid")) {
      const splittedCookies = cookiesHeader.split(";");
      const tokenString = splittedCookies.find((cookieString) =>
        cookieString.trim().startsWith("_sid")
      );

      if (tokenString) {
        const [, sid] = tokenString.split("=");

        token = sid;
      } else {
        next();
      }
    } else {
      return next();
    }
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err || !decoded || typeof decoded === "string") {
      return next();
    }

    req.userId = decoded.id;
    next();
  });
};

export { verifyToken };
