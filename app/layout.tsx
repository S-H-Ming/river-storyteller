import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { headers } from "next/headers"
import "./globals.css";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "River StoryTeller",
  description: "Learn more about the Tsen-wen River",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = headers().get("x-nonce")
  return (
    <html lang="en">
      <body className={`bg-image h-screen ${rubik.className}`}>{children}</body>
    </html>
  );
}
