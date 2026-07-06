import type { Metadata } from "next";
import config from "./config";
import { siteContent } from "@/data/publicContent";
import "./globals.css";

export const metadata: Metadata = {
  title: config.siteName,
  description: siteContent.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="relative font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
