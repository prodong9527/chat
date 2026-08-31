import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "9527 号 · 什么都接",
  description: "承接一切没有意义但有趣的业务。",
  openGraph: {
    title: "9527 号 · 什么都接",
    description: "承接一切没有意义但有趣的业务。",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f4ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
