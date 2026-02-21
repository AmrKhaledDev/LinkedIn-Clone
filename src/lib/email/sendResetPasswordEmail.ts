import nodemailer from "nodemailer";
// =====================================================================
export const sendResetPasswordEmail = async (
  userEmail: string,
  verificationToken: string,
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });
    const link = `${process.env.AUTH_URL}/password/reset-password/${verificationToken}`;
    await transporter.sendMail({
      from: '"LinkedIn Clone" <no-reply@linkedin.com>',
      to: userEmail,
      subject: "Linkedin - Reset Password",
      html: `
  <div style="font-family: Arial, sans-serif; padding:20px; line-height:1.6;">
      <p>Please click the button below to reset password your account:</p>
      <a href="${link}"
         style="
           display:inline-block;
           padding:10px 20px;
           background-color:#0a66c2;
           color:#ffffff;
           text-decoration:none;
           border-radius:6px;
           font-weight:bold;
         ">
         Reset Password
      </a>
      <p style="margin-top:20px; font-size:14px; color:#555;">
        If you did not create this account, you can safely ignore this email.
      </p>
      <p style="margin-top:30px; font-size:12px; color:#999;">
        © 2026 Linkedin Clone. All rights reserved.
      </p>
  </div>
`,
    });
    return {success:true,message:"A verification link has been sent to your email"}
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message:
        "An error occurred while sending the verification link. Try later",
    };
  }
};
