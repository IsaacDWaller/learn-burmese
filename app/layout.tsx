import "@/app/globals.css";
import "material-symbols/outlined.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learn Burmese",
  description: "Created by Isaac Waller",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased root`}
    >
      <div className="root">
        {children}
      </div>
    </body>
  </html>;
}