import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "stupid.fm — music, minus the stupid parts", description: "An AI-native music player." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }