import type { Metadata } from "next";
import "./globals.css";
import { Istok_Web } from "next/font/google";

export const metadata: Metadata = {
  title: "Weather App",
  description: "Find out the weather near you",
};

const istokWeb = Istok_Web({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={istokWeb.className}>
      <body>{children}</body>
    </html>
  );
}
