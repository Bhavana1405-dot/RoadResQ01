import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Providers } from "./providers";
import Navigation from "@/components/Navigation";
import "./globals.css";
import PageLayout from '@/components/PageLayout';

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Prompt Enhancer",
  description: "Enhance your AI prompts for better results",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.variable} font-sans antialiased`}>
        <Providers>
          <PageLayout>
            {children}
          </PageLayout>
        </Providers>
      </body>
    </html>
  );
}
