"use client";
import { ContextStatesType } from "@/lib/types/types";
import { createContext, useState, ReactNode } from "react";
// ===========================================================================
export const ContextStates = createContext<ContextStatesType | null>(null);
function Context({ children }: { children: React.ReactNode }) {
  // State Images
  const [bigImage, setBigImage] = useState<string | null>(null);
  const [bigImageFile, setBigImageFile] = useState<File | null>(null);
  const [smallImage, setSmallImage] = useState<string | null>(null);
  const [smallImageFile, setSmallImageFile] = useState<File | null>(null);
  const [mediaArticle, setMediaArticle] = useState<string | null>(null);
  const [mediaArticleFile, setMediaArticleFile] = useState<File | null>(null);
  // State Text
  const [titleArticle, setTitleArticle] = useState<string | null>(null);
  const [contentArticle, setContentArticle] = useState<string | null>(null);
  // State boolean
  const [addComment, setAddComment] = useState(false);
  return (
    <ContextStates.Provider
      value={{
        // Images
        bigImage,
        setBigImage,
        bigImageFile,
        setBigImageFile,
        smallImage,
        setSmallImage,
        smallImageFile,
        setSmallImageFile,
        mediaArticle,
        setMediaArticle,
        mediaArticleFile,
        setMediaArticleFile,
        // Text
        titleArticle,
        setTitleArticle,
        contentArticle,
        setContentArticle,
        // Boolean
        addComment,
        setAddComment,
      }}
    >
      {children}
    </ContextStates.Provider>
  );
}

export default Context;
