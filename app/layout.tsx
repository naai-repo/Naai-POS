import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Pricing from "@/components/pricing/Pricing";
import Action_Buttons from "@/components/action-buttons/Action_Buttons";
import Main_Section from "@/components/main/Main_Section";
import RecoilContextProvider from "./RecoilContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Naai-POS",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilContextProvider>        
          <Header />
          <div className="flex w-screen">
            <Pricing />
            <Main_Section>{children}</Main_Section>
            <Action_Buttons />
          </div>
        </RecoilContextProvider>
      </body>
    </html>
  );
}
