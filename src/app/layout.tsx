import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const azeretSemiMono = localFont({
  src: [
    {
      path: "../fonts/AzeretSemiMono-TRIAL-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/AzeretSemiMono-TRIAL-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-azeret-semimono",
});

export const metadata: Metadata = {
  title: "WaveSpeed - The Ultimate AI Media Generation Platform",
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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <meta name="apple-mobile-web-app-title" content="WaveSpeed" />
      <body className={`${azeretSemiMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
