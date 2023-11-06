const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (res, { email, subject, payload, template }) => {
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
    (error, info) => {
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

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

module.exports = sendEmail;
