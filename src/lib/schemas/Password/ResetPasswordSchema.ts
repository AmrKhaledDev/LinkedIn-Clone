import z from "zod";
// ===============================================================================================
export const ResetPasswordSchema = z
  .object({
    verificationToken: z.string(),
    newPassword: z
      .string({ message: "New password must be a string" })
      .min(8, { message: "New password must be at least 8 characters" })
      .regex(/^[A-Za-z0-9]+$/, {
        message: "Password can only contain letters and numbers",
      }).nonempty({message:"New password must be not empty"}),
    confirmPassword: z.string({ message: "Confirm password must be a string" }).nonempty({message:"Confirm password must be not empty"}),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
