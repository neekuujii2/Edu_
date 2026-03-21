import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!
  }
});

export async function sendOtpEmail(email: string, otp: string) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER!,
      to: email,
      subject: "Your OTP for Aspire Education Consultancy & Carrier Soution",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Email Verification</h2>
          <p>Hi,</p>
          <p>Your One-Time Password (OTP) is:</p>
          <div style="background-color: #f0f0f0; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h1 style="color: #007bff; letter-spacing: 5px; margin: 0;">${otp}</h1>
          </div>
          <p>This OTP is valid for 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Best regards,<br>Aspire Education Consultancy & Carrier Solution Team</p>
        </div>
      `
    });
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER!,
      to: email,
      subject: "Welcome to Aspire Education Consultancy & Carrier Solution",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Welcome to Aspire Education Consultancy & Carrier Solution</h2>
          <p>Hi ${name},</p>
          <p>Your account has been successfully created!</p>
          <p>You can now log in to your account and explore our courses and services.</p>
          <p>Best regards,<br>Aspire Education Consultancy & Carrier Solution Team</p>
        </div>
      `
    });
    return true;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return false;
  }
}

export async function sendPasswordResetEmail(email: string, resetLink: string) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER!,
      to: email,
      subject: "Reset Your Password - Aspire Education Consultancy & Carrier Solution",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Hi,</p>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 12px 30px; border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block;">Reset Password</a>
          </div>
          <p>Or copy and paste this link in your browser:</p>
          <p style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; word-wrap: break-word;">${resetLink}</p>
          <p style="color: #666; font-size: 12px;">This link will expire in 1 hour. If you didn't request this, please ignore this email and your password will remain unchanged.</p>
          <p>Best regards,<br>Aspire Education Consultancy & Carrier Solution Team</p>
        </div>
      `
    });
    return true;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
}
