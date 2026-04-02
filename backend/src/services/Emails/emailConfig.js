import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

export async function verifyemail(email, code) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
    // When you have an EU-domain, you must specify the endpoint:
    // url: "https://api.mailgun.net"
  });

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
          ${code}
        </div>
    
        <p class="message">
          This code will expire in 10 minutes.
        </p>
    
        <div class="footer">
          © 2026 Visitor Pass Management System
        </div>
    
      </div>
    </body>
    </html>`;

    const data = await mg.messages.create("visico.indevs.in", {
      from: "Visitor pass management system <postmaster@visico.indevs.in>",
      to: [email],
      subject: "Verify your Email",
      text: `Your verfication code is ,${code}`,
      html: verification_email_template,
    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}

export async function welcomemail(email, name) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
    // When you have an EU-domain, you must specify the endpoint:
    // url: "https://api.mailgun.net"
  });
  try {
    const welcome_email_template = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
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
      color: #ffffff;
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
      You can now log in and start using the platform to manage your visits, request passes, and access relevant services.
    </p>

    <p class="message">
      We’re glad to have you onboard and look forward to assisting you.
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

    const data = await mg.messages.create("visico.indevs.in", {
      from: "Visitor pass management system <postmaster@visico.indevs.in>",
      to: [email],
      subject: "Welcome to visi.co",
      html: welcome_email_template,
    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}

export async function welcomeemployees(email, name, role, token) {
  const link = `https://visitor-pass-ui.vercel.app/set-password?token=${token}`;
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
    // When you have an EU-domain, you must specify the endpoint:
    // url: "https://api.mailgun.net"
  });
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

    const data = await mg.messages.create("visico.indevs.in", {
      from: "Visitor pass management system <postmaster@visico.indevs.in>",
      to: [email],
      subject: "Welcome to visi.co",
      html: welcome_employee_template,
    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}

export async function appointmentsubmit(email, name, purpose) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
    // When you have an EU-domain, you must specify the endpoint:
    // url: "https://api.mailgun.net"
  });
  try {
    const appointment_template = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
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

    const data = await mg.messages.create("visico.indevs.in", {
      from: "Visitor pass management system <postmaster@visico.indevs.in>",
      to: [email],
      subject: "Appointment Submitted",
      html: appointment_template,
    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}

export async function passcreated(email, name, pdfBuffer) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
    // When you have an EU-domain, you must specify the endpoint:
    // url: "https://api.mailgun.net"
  });
  try {
    const pass_template = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  
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

    const data = await mg.messages.create("visico.indevs.in", {
      from: "Visitor pass management system <postmaster@visico.indevs.in>",
      to: [email],
      subject: "your pass has been created ",
      html: pass_template,
      attachment: [
        {
          filename: "visitor-pass.pdf",
          data: pdfBuffer, 
          contentType: "application/pdf",
        },
      ],
    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}

export async function reject(email, name, remark) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
    // When you have an EU-domain, you must specify the endpoint:
    // url: "https://api.mailgun.net"
  });
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

    const data = await mg.messages.create("visico.indevs.in", {
      from: "Visitor pass management system <postmaster@visico.indevs.in>",
      to: [email],
      subject: "Appointment rejected",
      html: reject_email_template,
    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}
