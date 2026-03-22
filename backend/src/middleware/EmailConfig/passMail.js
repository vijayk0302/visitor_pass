import { transporter } from "./emailConfig.js";


export const passEmail = async (email,name) => {

  try {
    const pass_template = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Visitor Pass Issued</title>
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
      Your visitor pass has been successfully issued.
    </div>

    <p class="message">
      You can view your visitor pass by logging into our website.Please bring the id card you mentioned while filling appointment form.
    </p>

    <a href="https://visitor-pass-ui.vercel.app/login" class="button">
      Login to View Pass
    </a>

    <div class="footer">
      © 2026 Visitor Pass Management System
    </div>

  </div>

</body>
</html>`;

    const info = await transporter.sendMail({
      from: `"Visitor pass management system" ${process.env.EMAIL_USER}`,
      to: email,
      subject: "Pass created Successfully",
      html: pass_template, 
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log(error,"error while sending email");
  }
};
