import { transporter } from "./emailConfig.js";

export const welcomeEmployee = async (email, name, role,token) => {
  const link=`https://visitor-pass-ui.vercel.app/set-password?token=${token}`
  try {
    const welcome_employee_template = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        text-align: center;
        font-family: Arial, sans-serif;
        background-color: #f4f6f8;
        margin: 0;
        padding: 0;
      }
      .title {
        font-size: 26px;
        font-weight: bold;
        color: #333;
        margin-bottom: 10px;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }
      .message {
        font-size: 16px;
        color: #555;
        margin: 10px 0;
        line-height: 1.6;
      }
      .header {
        text-align: center;
        color: #2c3e50;
      }
      .credentials {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 6px;
        margin-top: 10px;
        text-align: left;
      }
      .credentials p {
        margin: 8px 0;
        font-size: 14px;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #888;
        text-align: center;
      }
      .highlight {
        font-weight: bold;
        color: #2563eb;
      }
      .btn {
        display: inline-block;
        margin-top: 5px;
        padding: 12px 20px;
        background: #2563eb;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="title">Welcome to Visi.co</div>
      <p>Hello <span class="highlight">${name}</span>,</p>
      <p class="message">
        Your account has been created and verified successfully! You can now
        start using the Visitor Pass Management System to manage visitors
        efficiently.
      </p>
      <p class="message">You can use the following credentials to log in:</p>

      <div class="credentials">
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Role:</strong> ${role}</p>
      </div>

      <p class="message">
        Please keep your credentials safe and do not share them with anyone.
      </p>
      <p class="message">We're excited to have you on board!</p>

      <div style="text-align: center">
        <a href=${link} target="_blank" class="btn"
          >Set your Password</a
        >
      </div>

      <div class="footer">
        <p>
          If you did not create this account, please contact support
          immediately.
        </p>
        <p>© 2026 Visitor Pass Management System</p>
      </div>
    </div>
  </body>
</html>
`;

    const info = await transporter.sendMail({
      from: `"Visitor pass management system" ${process.env.EMAIL_USER}`,
      to: email,
      subject: "Welcome to Visi.co",
      html: welcome_employee_template,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log(error, "error while sending email");
  }
};
