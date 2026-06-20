import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MarkdownTools",
  description: "Free online Markdown converter and editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
