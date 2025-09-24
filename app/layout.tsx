import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Istok_Web } from "next/font/google";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Weather App",
  description: "Find out the weather near you",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
    <html lang="en" className={istokWeb.className} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
