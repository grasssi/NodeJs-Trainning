const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const email = require('../models/sendEmailSchema')
// add one mail
router.post('/email', async (req, res) => {
  try {
  const createdEmail = await email.create(req.body)
  res.json(createdEmail);
}
catch (err) {
  console.log(err);
  res.status(500).json({ message: 'Internal server error' });
}
})

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
      user: 'grassi.amine@gmail.com',
      pass: 'abcdef1990',
  },
  secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});
router.post('/text-mail', (req, res) => {
  const {to, subject, text } = req.body;
  const mailData = {
      from: 'grassi.amine@gmail.com',
      to: 'grassi.amine@gmail.com',
      subject: 'subject',
      text: 'text',
      html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
  };

  transporter.sendMail(mailData, (error, info) => {
      if (error) {
          return console.log(error);
      }
      res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });
});

module.exports = router;