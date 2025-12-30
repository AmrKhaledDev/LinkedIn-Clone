import Header from "@/components/Header/Header";
import Context from "@/context/Context";
import { Metadata } from "next";
import React from "react";
// ==============================================================================
export const metadata: Metadata = {
  title: "LinkedIn: Professional Networking & Careers",
  description:
    "LinkedIn is a professional social networking platform. It helps people connect with professionals, find jobs, build their careers, and share work experience and skills.",
  icons: {
    icon: "/linkedin.png",
  },
};
function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Context>
        <Header />
        {children}
      </Context>
    </div>
  );
}

export default layout;
