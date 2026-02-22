import { Metadata } from "next";
import FormForgotPassword from "./_components/FormForgotPassword";
// ===============================================================
export const metadata: Metadata = {
  title: "LinkedIn | Forgot Password",
  description:
    "Forgot your password? Enter your email to receive a verification code and reset your LinkedIn account password securely.",
};
function ForgotPassword() {
  return (
    <main className="min-h-[90vh] flex items-center justify-center">
      <FormForgotPassword />
    </main>
  );
}

export default ForgotPassword;
