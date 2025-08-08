import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "꾸깃 - 꾸준히 한 곳에서 투표해요!",
  description: "꾸준히 한 곳에서 투표해요!",
  openGraph: {
    title: "꾸깃",
    images: ["/images/illust/il-vote-progress-landscape.png"],
    url: "https://ggugitt.com/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
