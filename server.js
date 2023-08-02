const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Use process.env.PORT if it's available, otherwise fallback to 12345
const port = process.env.PORT || 12345;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

app.post('/send-email', (req, res) => {
  const { to, name, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: `Dear ${name}, Your booking was successful`,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ message: 'Email sent successfully' });
    }
  });
});

// Listen on the provided PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
