import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: config.sender_email,
      pass: config.gmail_app_pass,
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: config.sender_email, // sender address
    to,
    subject: 'Reset password for Gardenbook',
    text: 'Reset your password withing 10 minutes',
    html,
  });
};
