import "./globals.css";
import { Inter } from "next/font/google";
import BaseLayout from "./components/BaseLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <head></head>
      <body className={inter.className}>
        <BaseLayout children={children} />
      </body>
    </html>
  );
}
