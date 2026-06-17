import { Prisma } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
// ===================================================================
// Db Types
export type PostType = Prisma.PostGetPayload<{
  include: {
    user: {
      include: {
        followers: true;
      };
    };
    comments: {
      include: {
        user: true;
        post: {
          include: {
            user: true;
          };
        };
        likeForComments: {
          include: {
            user: true;
            comment: true;
          };
        };
        replays: {
          include: {
            user: true;
            comment: true;
            post: true;
            likeForReplays: {
              include: {
                user: true;
              };
            };
          };
        };
      };
    };
    likes: {
      include: {
        user: true;
        post: true;
      };
    };
    disLikes: {
      include: {
        user: true;
        post: true;
      };
    };
    saveItems: true;
  };
}>;
export type UserWithRelationType = Prisma.UserGetPayload<{
  include: {
    posts: {
      include: {
        user: {
          include: {
            followers: true;
          };
        };
        comments: {
          include: {
            user: true;
            post: {
              include: {
                user: true;
              };
            };
            likeForComments: {
              include: {
                user: true;
                comment: true;
              };
            };
            replays: {
              include: {
                user: true;
                comment: true;
                post: true;
                likeForReplays: {
                  include: {
                    user: true;
                  };
                };
              };
            };
          };
        };
        likes: {
          include: {
            user: true;
            post: true;
          };
        };
        disLikes: {
          include: {
            user: true;
            post: true;
          };
        };
        saveItems: true;
      };
    };
    followers: {
      include: {
        follower: true;
      };
    };
    saveItems: {
      include: {
        post: {
          include: {
            user: true;
          };
        };
      };
    };
    receivedNotifications: {
      include: {
        actor: true;
      };
    };
  };
}>;
export type UserWithFollower = Prisma.UserGetPayload<{
  include: {
    followers: true;
  };
}>;
export type NotificationWithRelations = Prisma.NotificationGetPayload<{
  include: {
    actor: true;
  };
}>;
export type CommentDBWithRelations = Prisma.CommentGetPayload<{
  include: {
    user: true;
    post: {
      include: {
        user: true;
      };
    };
    likeForComments: {
      include: {
        user: true;
        comment: true;
      };
    };
    replays: {
      include: {
        user: true;
        comment: true;
        post: true;
        likeForReplays: {
          include: {
            user: true;
          };
        };
      };
    };
  };
}>;
export type ReplayWithRelations = Prisma.ReplayGetPayload<{
  include: {
    user: true;
    comment: true;
    post: true;
    likeForReplays: {
      include: {
        user: true;
      };
    };
  };
}>;
export type SaveItemType = Prisma.SaveItemGetPayload<{
  include: {
    post: {
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
  dropDownMenu: string | null;
  setDropDownMenu: Dispatch<SetStateAction<string | null>>;
};

// Form Field Type
export type FormFieldType = {
  id: string;
  label: string;
  placeholder?: string;
  setState: Dispatch<SetStateAction<string>>;
  disabled: boolean;
  value: string | number;
  error?: string;
  type: "text" | "password" | "email";
  showPassword?: boolean;
  setShowPassword?: Dispatch<SetStateAction<boolean>>;
};