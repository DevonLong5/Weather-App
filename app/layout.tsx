import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weather App",
  description: "Find out the weather near you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
