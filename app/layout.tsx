import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SplashCursor from "./components/SplashCursor";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Somnia Games",
	description: "Somnia Games",
	icons: {
		icon: "/assets/somnia-logo.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" style={{ background: "#000" }}>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{ background: "#000" }}>
				{children}
				<SplashCursor />
			</body>
		</html>
	);
}
