const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ejs =require('ejs')
const path = require('path');
const fs = require('fs');
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
    // 1. read template path 
    const templatePath = path.resolve('./mail_templates', 'Notification_v1.html');
    // 2. read template content 
    const content = fs.readFileSync(templatePath, { encoding: 'utf-8' });

    const mailData = {
      from: 'AngularGrassi@gmail.com',
      to: 'AngularGrassi@gmail.com',
      subject: 'subject',
      html: content,
    };

    const info = await transporter.sendMail(mailData);
    res.send({ message: "html send", message_id: info.messageId });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//4éme methode without MongoDb
router.post('/html-mail/v3/:name', async (req, res) => {
  try {
    // 1. read template path 
    const templatePath = path.resolve('./mail_templates', 'Notification_v2.html');
    // 2. read template content 
    const content = fs.readFileSync(templatePath, { encoding: 'utf-8' });
    // 3. rendering template 
    const name= req.params.name;
   
    const mailData = {
      from: 'AngularGrassi@gmail.com',
      to: 'AngularGrassi@gmail.com',
      subject: 'subject',
      html: ejs.render(name)
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