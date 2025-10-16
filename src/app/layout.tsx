import type { Metadata } from "next";
import { Sometype_Mono } from "next/font/google";
import "./globals.css";

const sometype_mono = Sometype_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "lukaslumiere.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sometype_mono.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
