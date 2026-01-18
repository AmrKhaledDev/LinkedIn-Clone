import z from "zod";
// ====================================================================================
export const CreatePostSchema = z.object({
  contentTxt: z
    .string({ message: "Content must be a string" })
    .optional()
    .nullable(),
  mediaUrl: z.string().optional().nullable(),
  mediaType: z.string().optional().nullable(),
  userId: z.string().nonempty({ message: "User not found" }),
});
