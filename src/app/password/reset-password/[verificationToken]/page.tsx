import { Metadata } from "next";
import FormResetPassword from "./_components/FormResetPassword";
// ============================================================================
export const metadata: Metadata = {
  title: "LinkedIn | Reset Password",
  description:
    "Reset your LinkedIn account password securely. Create a new password to regain access to your account.",
};
async function ResetPassword({
  params,
}: {
  params: Promise<{ verificationToken: string }>;
}) {
  const { verificationToken } = await params;
  return (
    <main className="section-space min-h-[90vh] flex items-center justify-center">
      <FormResetPassword verificationToken={verificationToken} />
    </main>
  );
}

export default ResetPassword;
