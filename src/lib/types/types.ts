import z from "zod";
import { RegisterSchema } from "../schemas/RegisterSchema";
import { LoginSchema } from "../schemas/LoginSchema";
import { CreatePostSchema } from "../schemas/CreatePostSchema";
import { Prisma } from "@prisma/client";
// ===================================================================
// Actions types
export type RegisterActionDataType = z.infer<typeof RegisterSchema>;
export type LoginActionDataType = z.infer<typeof LoginSchema>;
export type CreatePostActionDataType = z.infer<typeof CreatePostSchema>;
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
export type ContextStatesType = {
  bigImage: string | null;
  setBigImage: React.Dispatch<React.SetStateAction<string | null>>;
  bigImageFile: File | null;
  setBigImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  smallImage: string | null;
  setSmallImage: React.Dispatch<React.SetStateAction<string | null>>;
  smallImageFile: File | null;
  setSmallImageFile: React.Dispatch<React.SetStateAction<File | null>>;
};
// ===
