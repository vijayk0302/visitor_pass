import { transporter } from "./emailConfig.js";


export const reject = async (email,name,remark) => {

  try {
    const reject_email_template = `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
      margin: auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      font-size: 20px;
      font-weight: bold;
      color: #d32f2f;
      margin-bottom: 15px;
    }
    .content {
      font-size: 14px;
      color: #333;
      line-height: 1.6;
    }
    .remark {
      background: #ffe6e6;
      padding: 10px;
      border-left: 4px solid #d32f2f;
      margin: 10px 0;
    }
    .footer {
      margin-top: 20px;
      font-size: 13px;
      color: #777;
    }
    .btn {
      display: inline-block;
      margin-top: 15px;
      padding: 10px 15px;
      background: #1e88e5;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>

<body>
  <div class="container">

    <div class="header">
      Appointment Request Rejected
    </div>

    <div class="content">
      Dear ${name},<br><br>

      We regret to inform you that your appointment has been <b>rejected</b>.<br><br>

      <div class="remark">
        <b>Reason:</b> ${remark}
      </div>

      You may create a new appointment with the correct details or required documents.<br><br>

      <br><br>
      Thank you for your understanding.

    </div>

    <div class="footer">
      Regards,<br>
      Visi.co Management Team
    </div>

  </div>
</body>
</html>`;

    const info = await transporter.sendMail({
      from: `"Visitor pass management system" ${process.env.EMAIL_USER}`,
      to: email,
      subject: "Appointment Rejected",
      html: reject_email_template, 
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log(error,"error while sending email");
  }
};
