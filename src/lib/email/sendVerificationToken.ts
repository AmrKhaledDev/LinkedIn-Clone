import nodemailer from "nodemailer";
// =====================================================================
export const sendVerificationToken = async (
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
    const link = `${process.env.DOMAIN}/verify?t=${verificationToken}`;
    await transporter.sendMail({
      from: '"LinkedIn Clone" <no-reply@linkedin.com>',
      to: userEmail,
      subject: "Linkedin - Login verification",
      html: `
  <div style="font-family: Arial, sans-serif; padding:20px; line-height:1.6;">
      <h2>Hello 👋</h2>
      <p>Thank you for signing up.</p>
      <p>Please click the button below to verify your email address:</p>
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
         Verify Email
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
