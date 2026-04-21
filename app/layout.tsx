import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Story Generator",
  description: "短篇幻想故事生成器",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
