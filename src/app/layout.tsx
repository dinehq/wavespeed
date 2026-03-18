import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { CookieConsent } from "@/components/cookie-consent";
import { PromoBar } from "@/components/promo-bar";
import "./globals.css";

const azeret = localFont({
  src: [
    {
      path: "../fonts/Azeret-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Azeret-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-azeret",
});

export const metadata: Metadata = {
  title: "WaveSpeed - Ultimate AI Media Generation Platform",
  description:
    "Build multimodal applications with a single high-speed interface.",
  appleWebApp: {
    title: "WaveSpeed",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${azeret.variable} ${GeistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PromoBar />
          {children}
          <CookieConsent />
          <Toaster />
        </ThemeProvider>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="https://unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
