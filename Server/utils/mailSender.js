const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
      throw new Error(
        "Email configuration is incomplete. Set MAIL_HOST, MAIL_USER, and MAIL_PASS."
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT) || 587,
      secure: process.env.MAIL_SECURE === "true",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.MAIL_USER,
      to: email,
      subject: title,
      html: body,
    });

    return info;
  } catch (error) {
    console.error("mailSender error:", error.message);
    throw error;
  }
};

module.exports = mailSender;
