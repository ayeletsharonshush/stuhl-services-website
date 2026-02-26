import nodemailer from 'nodemailer';

interface EstimateData {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
}

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
}

export async function sendNotificationEmail(data: EstimateData) {
  const transporter = getTransporter();

  if (!transporter) {
    console.log('Email not configured - skipping notification. Set GMAIL_USER and GMAIL_APP_PASSWORD to enable.');
    console.log('New estimate request:', JSON.stringify(data, null, 2));
    return;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1a2744; color: white; padding: 20px 30px; border-radius: 12px 12px 0 0;">
        <h2 style="margin: 0;">New Estimate Request</h2>
        <p style="margin: 5px 0 0; opacity: 0.8;">Stuhl Services LLC Website</p>
      </div>
      <div style="background: #f8f6f0; padding: 30px; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #1a2744; width: 130px;">Name:</td>
            <td style="padding: 10px 0; color: #333;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #1a2744;">Email:</td>
            <td style="padding: 10px 0;"><a href="mailto:${data.email}" style="color: #c9a94e;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #1a2744;">Phone:</td>
            <td style="padding: 10px 0; color: #333;">${data.phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #1a2744;">Project Type:</td>
            <td style="padding: 10px 0;"><span style="background: #c9a94e; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px;">${data.projectType}</span></td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 8px; border-left: 4px solid #c9a94e;">
          <p style="margin: 0 0 5px; font-weight: bold; color: #1a2744;">Project Details:</p>
          <p style="margin: 0; color: #555; line-height: 1.6;">${data.message}</p>
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #999;">This request was submitted via the Stuhl Services LLC website.</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Stuhl Services Website" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: data.email,
    subject: `New ${data.projectType} Estimate Request from ${data.name}`,
    html,
  });
}
