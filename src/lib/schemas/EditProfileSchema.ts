import { z } from "zod";
// ============================================================================
export const EditProfileSchema = z.object({
  userId: z.string().nonempty({ message: "Login to edit your profile" }),
  name: z
    .string({ message: "Name must be a valid text" })
    .trim()
    .min(2, { message: "Name is too short" })
    .max(50, { message: "Name is too long" }),

  headline: z
    .string({ message: "Headline must be a valid text" })
    .trim()
    .max(220, { message: "Headline is too long" })
    .optional(),

  school: z
    .string({ message: "Education must be a valid text" })
    .trim()
    .min(3, { message: "Education name is too short" })
    .max(100, { message: "Education name is too long" }),

  country: z
    .string({ message: "Country must be a valid text" })
    .trim()
    .min(2, { message: "Country name is too short" })
    .max(60, { message: "Country name is too long" }),

  city: z
    .string({ message: "City must be a valid text" })
    .trim()
    .min(2, { message: "City name is too short" })
    .max(85, { message: "City name is too long" }),
});
