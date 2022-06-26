const nodemailer = require('nodemailer');
const catchAsync = require('./catchAsync');

const sendEmail = catchAsync(async (options) => {
  // 1) create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 2) define email options
  const mailOptions = {
    from: `Aatu Korhonen <live_id09@hotmail.com>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };
  // 3) send the email
  await transporter.sendMail(mailOptions);
});

module.exports = sendEmail;

// const sendEmailWIthGMAIl = (options) => {
//   // 1) create a transporter
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       password: process.env.EMAIL_PASSWORD,
//     },
//     // Activate in email "less secure app option"
//   });
//   // 2) define email options
//   // 3) send the email
// };
