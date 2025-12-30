"use client";
import { ContextStatesType } from "@/lib/types/types";
import { createContext, useState, ReactNode } from "react";
// ===========================================================================
export const ContextStates = createContext<ContextStatesType | null>(null);
function Context({ children }: { children: React.ReactNode }) {
  const [bigImage, setBigImage] = useState<string | null>(null);
  const [bigImageFile, setBigImageFile] = useState<File | null>(null);
  const [smallImage, setSmallImage] = useState<string | null>(null);
  const [smallImageFile, setSmallImageFile] = useState<File | null>(null);

  return (
    <ContextStates.Provider
      value={{
        bigImage,
        setBigImage,
        bigImageFile,
        setBigImageFile,
        smallImage,
        setSmallImage,
        smallImageFile,
        setSmallImageFile,
      }}
    >
      {children}
    </ContextStates.Provider>
  );
}

export default Context;
