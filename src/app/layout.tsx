import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { CategoryChips } from "@/components/category-chips";
import { CategoryNav } from "@/components/category-nav";
import { Footer } from "@/components/footer";
import { HeaderFallback, SiteHeader } from "@/components/site-header";
import { Ticker } from "@/components/ticker";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "আজকের বাজারের দাম এক নজরে",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f0f5f0]">
        <div className="flex min-h-full w-full flex-col bg-[#f0f5f0]">
          <header className="bg-[#fafcfa]/95">
            <Suspense fallback={<HeaderFallback />}>
              <SiteHeader />
            </Suspense>
            <Suspense fallback={<CategoryChips />}>
              <CategoryNav />
            </Suspense>
          </header>
          <Suspense fallback={<div className="h-[37px] w-full bg-[#fafcfa]" />}>
            <Ticker />
          </Suspense>
          <main className="mx-auto w-full max-w-[1280px] flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
