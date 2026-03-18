import { transporter } from "./emailConfig.js";


export const sendverificationcode = async (email, verificationcode) => {

  try {
    const verification_email_template = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 40px auto;
      background: white;
      padding: 30px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .title {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      margin-bottom: 10px;
    }

    .message {
      font-size: 16px;
      color: #555;
      margin-bottom: 20px;
    }

    .code {
      font-size: 30px;
      letter-spacing: 6px;
      font-weight: bold;
      background: #f1f5f9;
      padding: 15px 25px;
      border-radius: 6px;
      display: inline-block;
      margin: 20px 0;
    }

    .footer {
      font-size: 12px;
      color: #888;
      margin-top: 30px;
    }
  </style>
</head>

<body>
  <div class="container">
    
    <div class="title">Visitor Pass Management System</div>

    <p class="message">
      Use the verification code below to verify your email.
    </p>

    <div class="code">
      ${verificationcode}
    </div>

    <p class="message">
      This code will expire in 10 minutes.
    </p>

    <div class="footer">
      © ${new Date().getFullYear()} Visitor Pass Management System
    </div>

  </div>
</body>
</html>`;

    const info = await transporter.sendMail({
      from: `"Visitor pass management system" ${process.env.EMAIL_USER}`,
      to: email,
      subject: "Verify your Email",
      text: `Your verfication code is ,${verificationcode}`, // Plain-text version of the message
      html: verification_email_template, // HTML version of the message
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log(error,"error while sending email");
  }
};
