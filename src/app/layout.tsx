import type { Metadata } from "next";
import { Montserrat, Sometype_Mono } from "next/font/google";
import "./globals.css";

const sometype_mono = Sometype_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
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
      <body
        className={`${sometype_mono.className} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
