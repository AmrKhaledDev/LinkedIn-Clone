import z from "zod";

export const CreateArticleSchema = z.object({
  userId: z.string().nonempty({ message: "Error: User not found" }),

  title: z.preprocess(
    (val) => (val === null ? "" : val),
    z
      .string()
      .min(2, "Title must be at least 2 characters long")
      .max(200, "Title must be at most 200 characters long")
  ),

  content: z.preprocess(
    (val) => (val === null ? "" : val),
    z
      .string()
      .min(50, "Content must be at least 50 characters long")
      .max(100000, "Content must be at most 100000 characters long")
  ),

  image: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
});
