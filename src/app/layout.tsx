import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
// ==========================================================================
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400","500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "LinkedIn: Professional Networking & Careers",
  description:
    "LinkedIn is a professional social networking platform. It helps people connect with professionals, find jobs, build their careers, and share work experience and skills.",
  icons: {
    icon: "/linkedin.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased font-medium wrap-break-word text-shadow-2xs`}>
        {children} <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
