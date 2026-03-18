import { transporter } from "./emailConfig.js";


export const welcome = async (email,name) => {

  try {
    const welcome_email_template = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Welcome</title>
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
      background: #ffffff;
      padding: 30px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .title {
      font-size: 26px;
      font-weight: bold;
      color: #333;
      margin-bottom: 10px;
    }

    .message {
      font-size: 16px;
      color: #555;
      margin: 15px 0;
      line-height: 1.6;
    }

    .highlight {
      font-weight: bold;
      color: #2563eb;
    }

    .button {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 22px;
      background-color: #2563eb;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-size: 14px;
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

    <div class="title">Welcome to Visi.co</div>

    <p class="message">
      Hello <span class="highlight">${name}</span>,
    </p>

    <p class="message">
      Your account has been successfully created and verified.  
      You can now start using the Visitor Pass Management System to manage visitors efficiently.
    </p>

    <p class="message">
      We're excited to have you on board!
    </p>

    <a class="button" href="https://visitor-pass-ui.vercel.app/login">
      Go to Dashboard
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
      subject: "Welcome to Visi.co",
      html: welcome_email_template, 
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log(error,"error while sending email");
  }
};
