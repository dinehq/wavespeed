import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { PromoBar } from "@/components/promo-bar";
import "./globals.css";


const azeret = localFont({
  src: [
    {
      path: "../fonts/Azeret-TRIAL-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Azeret-TRIAL-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-azeret",
});

export const metadata: Metadata = {
  title: "WaveSpeed - Ultimate AI Media Generation Platform",
  description:
    "Build multimodal applications with a single high-speed interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="apple-mobile-web-app-title" content="WaveSpeed" />
      <body
        className={`${azeret.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PromoBar />
          {children}
          <Toaster />
        </ThemeProvider>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </body>
    </html>
  );
}
