const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});

// Endpoint for sending emails
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Configure your SMTP settings here
      // For example, you can use Gmail SMTP:
      service: 'Gmail',
      auth: {
        user: 'drbksharma90@gmail.com',
        pass: 'wvrqxdijhiszytfw' //qasebpzqbxowoyev
      },
    });

    // Define email options
    const mailOptions = {
      from: 'drbksharma90@gmail.com',
      to: to,
      subject: subject,
      text: text,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send success response
    res.status(200).json({ status: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);

    // Send failure response
    res.status(500).json({ status: false, message: 'Failed to send email' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
