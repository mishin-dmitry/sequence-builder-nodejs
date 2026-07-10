import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import dotenv from "dotenv";
import db from "../models";
import sendEmail from "../utils/send-email";

const User = db.users;
const Token = db.tokens;

dotenv.config();

// Регистрация
const signup = async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      res.status(200).send({ error: "User already exists" });

      return;
    }

    user = await User.create({
      email: req.body.email,
      password: bcrypt.hashSync(
        req.body.password,
        Number(process.env.BCRYPT_SALT)
      ),
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      algorithm: "HS256",
      expiresIn: "30d",
    });

    res.cookie("_sid", token);

    res.status(201).send({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    res.status(500).send({ error: "Cannot create user" });
  }
};

// Авторизация
const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(200).send({ error: "Invalid password or email" });
    }

    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(200).send({
        error: "Invalid password or email",
      });
    }

    const jwtToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
      {
        algorithm: "HS256",
        expiresIn: "30d",
      }
    );

    res.cookie("_sid", jwtToken);

    return res.status(200).send({
      id: user.id,
      email: user.email,
    });
  } catch {
    return res.status(500).send({ error: "Error during login" });
  }
};

// Разлогин
const logout = async (req: Request, res: Response) => {
  try {
    req.userId = null;
    req.user = null;

    res.clearCookie("_sid");

    return res.status(200).send({});
  } catch (error) {
    console.log(error);
  }
};

const requestResetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return res.status(200).send({ error: "user not found" });
  }

  const token = await Token.findOne({ where: { userId: user.id } });

  if (token) {
    await token.destroy();
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(process.env.BCRYPT_SALT));

  await Token.create({
    userId: user.id,
    token: hash,
  });

  const link = `${process.env.DOMAIN}/reset-password?token=${resetToken}&id=${user.id}`;

  return sendEmail(res, {
    email,
    subject: "Запрос на смену пароля",
    payload: { link },
    template: "./templates/request-reset-password.handlebars",
  });
};

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { id, token, password } = req.body;

  const resetPasswordToken = await Token.findOne({ where: { userId: id } });

  if (!resetPasswordToken) {
    throw new Error("Invalid or expired token");
  }

  const isTokenValid = await bcrypt.compare(token, resetPasswordToken.token);

  if (!isTokenValid) {
    throw new Error("Invalid or expired token");
  }

  const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT));

  await User.update(
    { password: hash },
    {
      where: {
        id,
      },
    }
  );

  await resetPasswordToken.destroy();

  return res.status(200).send({ status: "Пароль успешно обновлен" });
};

export { signup, login, logout, requestResetPassword, resetPassword };
