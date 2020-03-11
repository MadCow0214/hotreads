import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const generateVerifyCode = () => {
  const adjectiveIndex = Math.floor(Math.random() * adjectives.length);
  const nounIndex = Math.floor(Math.random() * nouns.length);

  return `${adjectives[adjectiveIndex]} ${nouns[nounIndex]}`;
};

export const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };

  const client = nodemailer.createTransport(sgTransport(options));

  return client.sendMail(email);
};

export const sendVerifyMail = (adress, code) => {
  const email = {
    from: "admin@hotread.com",
    to: adress,
    subject: "Verify Code for HOTREAD",
    html: `Hello! Your verify code is [ <strong>${code}</strong> ].<br/>Copy paste on the app/website to start HOTREAD!`
  };

  return sendMail(email);
};
