// backend/config/emailConfig.js

import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    secure: false, // true for 465, false for other ports
  });
};

export default createTransporter;
