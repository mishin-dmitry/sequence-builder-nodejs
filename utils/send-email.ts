import { Response } from "express";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";

interface SendEmailOptions {
  email: string;
  subject: string;
  payload: Record<string, unknown>;
  template: string;
}

const sendEmail = async (
  res: Response,
  { email, subject, payload, template }: SendEmailOptions
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const source = fs.readFileSync(path.join(__dirname, template), "utf8");

  const compiledTemplate = handlebars.compile(source);

  // Send email
  transporter.sendMail(
    {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: subject,
      html: compiledTemplate(payload),
    },
    (error) => {
      if (error) {
        res.status(200).json({
          error: "Ошибка при отправке письма",
        });
      } else {
        return res.status(200).json({
          success: true,
        });
      }
    }
  );
};

export = sendEmail;
