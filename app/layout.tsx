import type { Metadata } from "next";
import { Vibur, Gaegu } from "next/font/google";
import "./globals.css";

const vibur = Vibur({
  variable: "--font-vibur",
	weight: ['400']
});

const gaegu = Gaegu({
	variable: "--font-gaegu",
	weight: ['300', '400', '700']
})

export const metadata: Metadata = {
  title: "MPASI Affan & Bilal",
  description: "Kumpulan resep MPASI dan jadwal menu MPASI Affan dan Bilal.",
  manifest: "/manifest.json"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${vibur.variable} ${gaegu.variable} h-full antialiased`}
    >
      <body className="w-full min-h-full flex flex-col">{children}</body>
    </html>
  );
}
