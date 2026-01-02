import z from "zod";
import { RegisterSchema } from "../schemas/RegisterSchema";
import { LoginSchema } from "../schemas/LoginSchema";
import { CreatePostSchema } from "../schemas/CreatePostSchema";
import { Prisma } from "@prisma/client";
import { EditProfileSchema } from "../schemas/EditProfileSchema";
import { CreateArticleSchema } from "../schemas/CreateArticleSchema";
// ===================================================================
// Actions types
export type RegisterActionDataType = z.infer<typeof RegisterSchema>;
export type LoginActionDataType = z.infer<typeof LoginSchema>;
export type CreatePostActionDataType = z.infer<typeof CreatePostSchema>;
export type EditProfileActionDataType = z.infer<typeof EditProfileSchema>;
export type CreateArticleActionDataType = z.infer<typeof CreateArticleSchema>
// Db Types
export type PostType = Prisma.PostGetPayload<{
  include: {
    user: true;
  };
}>;
export type UserWithRelationType = Prisma.UserGetPayload<{
  include: {
    posts: {
      include: {
        user: true;
      };
    };
  };
}>;
// context type
export type ContextStatesType = {
  // Images
  bigImage: string | null;
  setBigImage: React.Dispatch<React.SetStateAction<string | null>>;
  bigImageFile: File | null;
  setBigImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  smallImage: string | null;
  setSmallImage: React.Dispatch<React.SetStateAction<string | null>>;
  smallImageFile: File | null;
  setSmallImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  mediaArticle: string | null;
  setMediaArticle: React.Dispatch<React.SetStateAction<string | null>>;
  mediaArticleFile: File | null;
  setMediaArticleFile: React.Dispatch<React.SetStateAction<File | null>>;
  // Text
  titleArticle: string | null;
  setTitleArticle: React.Dispatch<React.SetStateAction<string | null>>;
  contentArticle: string | null;
  setContentArticle: React.Dispatch<React.SetStateAction<string | null>>;
};
