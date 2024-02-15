import nodemailer from 'nodemailer';
import config from '@config/config.js';
import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';

const mailman = nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    secure: config.mail.secure,
    auth: {
        user: config.mail.username,
        pass: config.mail.password,
    },
} satisfies SMTPTransport.Options);

export default mailman;
