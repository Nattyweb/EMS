require('dotenv').config();

const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

module.exports.sendmail = (sender, receiver, subject, message) => {
  // Step 1
  const auth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY, 
        domain: process.env.MAILGUN_DOMAIN
    }
  };
  // Step 2
  let transporter = nodemailer.createTransport( mailGun(auth) );
  // Step 3
  let mailOptions = {
    from: 'ICT YEP chukeg2012@gmail.com', 
    to: receivers,
    subject: subject,
    text: message 
  };
  
  // Step 4
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        console.log('email not sent');
    }
    console.log('Email sent!!!'); 
  });
  
}