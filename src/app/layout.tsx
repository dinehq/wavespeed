import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { Agentation } from "agentation";
import "./globals.css";

const azeret = localFont({
  src: [
    {
      path: "../fonts/Azeret-TRIAL-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Azeret-TRIAL-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Azeret-TRIAL-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/Azeret-TRIAL-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Azeret-TRIAL-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-azeret",
});

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
      <meta name="apple-mobile-web-app-title" content="WaveSpeed" />
      <body
        className={`${azeret.variable} ${azeretSemiMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
