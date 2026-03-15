import { transporter } from "./emailConfig.js";


export const approvalEmail = async (email,name) => {

  try {
    const approval_template = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Account Approved</title>
  <style>
    body{
      font-family: Arial, sans-serif;
      background:#f4f6f8;
      margin:0;
      padding:0;
    }

    .container{
      max-width:600px;
      margin:40px auto;
      background:#ffffff;
      padding:30px;
      border-radius:8px;
      text-align:center;
      box-shadow:0 2px 10px rgba(0,0,0,0.1);
    }

    .title{
      font-size:24px;
      font-weight:bold;
      color:#333;
      margin-bottom:10px;
    }

    .message{
      font-size:16px;
      color:#555;
      line-height:1.6;
      margin:15px 0;
    }

    .success{
      background:#e6ffed;
      color:#1a7f37;
      padding:12px;
      border-radius:5px;
      margin:20px 0;
      font-weight:bold;
    }

    .button{
      display:inline-block;
      margin-top:20px;
      padding:12px 24px;
      background:#2563eb;
      color:white;
      text-decoration:none;
      border-radius:5px;
      font-size:14px;
    }

    .footer{
      font-size:12px;
      color:#888;
      margin-top:30px;
    }
  </style>
</head>

<body>

  <div class="container">

    <div class="title">
      Visitor Pass Management System
    </div>

    <p class="message">
      Hello <b>${name}</b>,
    </p>

    <div class="success">
      Your account has been approved by the administrator.
    </div>

    <p class="message">
      You can now log in and start using the Visitor Pass Management System.
    </p>

    <a href="https://visitor-pass-ui.vercel.app/login" class="button">
      Login to your account
    </a>

    <div class="footer">
      © 2026 Visitor Pass Management System
    </div>

  </div>

</body>
</html>`;

    const info = await transporter.sendMail({
      from: '"Visitor pass management system" <sarcasticavi03@gmail.com>',
      to: email,
      subject: "Welcome to Visi.co",
      html: approval_template, 
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log(error,"error while sending email");
  }
};
