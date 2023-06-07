const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

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
        user: 'federer.roger0034@gmail.com',
        pass: 'qasebpzqbxowoyev' //qasebpzqbxowoyev
      },
    });

    // Define email options
    const mailOptions = {
      from: 'federer.roger0034@gmail.com',
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
