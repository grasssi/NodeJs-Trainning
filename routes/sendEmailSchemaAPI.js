const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const email = require('../models/sendEmailSchema')


const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD,
  },
  secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

//1er methode with MongoDb
router.post('/email', async (req, res) => {
  try {
    const createdEmail = await email.create(req.body)
    const mailData = {
      from: createdEmail.from,
      to: createdEmail.to,
      subject: createdEmail.subject,
      text: createdEmail.text,
    }
    const info = await transporter.sendMail(mailData);
    res.send({ message: "Mail send", message_id: info.messageId });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
})

//2éme methode without MongoDb
router.post('/html-mail', async (req, res) => {
  try {
    const mailData = {
      from: 'AngularGrassi@gmail.com',
      to: 'AngularGrassi@gmail.com',
      subject: 'subject',
      html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
    };

    const info = await transporter.sendMail(mailData);
    res.send({ message: "html send", message_id: info.messageId });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//3éme methode without MongoDb
router.post('/html-mail/v2', async (req, res) => {
  try {
    const mailData = {
      from: 'AngularGrassi@gmail.com',
      to: 'AngularGrassi@gmail.com',
      subject: 'subject',
      html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
    };

    const info = await transporter.sendMail(mailData);
    res.send({ message: "html send", message_id: info.messageId });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});







module.exports = router;