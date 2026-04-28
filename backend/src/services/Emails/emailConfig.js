import FormData from "form-data";
import Mailgun from "mailgun.js";

const sendEmail = async ({ address, subject, html, attachment }) => {
  try {
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY || "API_KEY",
    });

    const data = {
      from: "Visitor pass management system <postmaster@visico.indevs.in>",
      to: [address],
      subject,
      html,
    };
    if (data.attachment) {
      data.attachment = attachment;
    }
    await mg.messages.create("visico.indevs.in",data);
    
  } catch (error) {
    console.error("Email error:", error);
  }
};

export async function verifyemail(email, code) {
  const html = "Your verification code is: <b>" + code + "</b>";
  return sendEmail({
    address: email,
    subject: "verify your email",
    html,
  });
}

export async function welcomemail(email, name) {
  const html = "Welcome " + name + "! Your account is active.";
  return sendEmail({
    address: email,
    subject: "Welcome to visi.co",
    html,
  });
}

export async function welcomeemployees(email, name, role, token) {
  const url = `https://visitor-pass-ui.vercel.app/set-password?token=${token}`;

  const html = `
<p>Hello ${name},</p>
<p>Your account has been created in the Visitor Pass Management System.</p>
<p><b>Email:</b> ${email}</p>
<p><b>Role:</b> ${role}</p>
<p>Please set your password using the link below:</p>
<a>${url}</a>
`;
  return sendEmail({
    address: email,
    subject: "Employee Account Created",
    html,
  });
}

export async function appointmentsubmit(email, name, purpose) {
  const html = `Hello ${name}, your request for ${purpose} is submitted.`;
  return sendEmail({
    address: email,
    subject: "appointment submitted",
    html,
  });
}

export async function passcreated(email, name, pdfBuffer) {
  const html = `
<p>Hello ${name},</p>
<p>Your visitor pass has been created.</p>
<p>Please log in to view your pass.</p>
`;
  return sendEmail({
    address: email,
    subject: "Your pass has been created",
    html,
    attachment: [
      {
        filename: "visitor-pass.pdf",
        data: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  });
}

export async function reject(email, name, remark) {
  const html = "Hi " + name + ", your request was rejected. Reason: " + remark;
  return sendEmail({
    address: email,
    subject: "rejected",
    html,
  });
}
