import { transporter } from "./emailConfig.js";


export const approvalEmail = async (email,name,purpose) => {

  try {
    const appointment_template = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Appointment Created</title>
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

    .status{
      background:#fff3cd;
      color:#856404;
      padding:12px;
      border-radius:5px;
      margin:20px 0;
      font-weight:bold;
    }

    .details{
      background:#f8fafc;
      padding:15px;
      border-radius:6px;
      margin-top:20px;
      text-align:left;
    }

    .details p{
      margin:6px 0;
      font-size:14px;
      color:#444;
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

    <p class="message">
      Your visitor appointment request has been successfully created.
    </p>

    <div class="status">
      The appointment is currently waiting for approval.
    </div>

    <div class="details">
      <p><b>Visitor Name:</b> ${name}</p>
      <p><b>Purpose:</b> ${purpose}</p>
    </div>

    <p class="message">
      You will receive another email once the appointment has been approved.
    </p>

    <div class="footer">
      © 2026 Visitor Pass Management System
    </div>

  </div>

</body>
</html>`;

    const info = await transporter.sendMail({
      from: '"Visitor pass management system" <sarcasticavi03@gmail.com>',
      to: email,
      subject: "appointment submitted",
      html: appointment_template, 
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log(error,"error while sending email");
  }
};
