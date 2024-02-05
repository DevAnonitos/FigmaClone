import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Room } from "./Room";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FigmaCloneApp",
  description: "Realtime colaboration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
