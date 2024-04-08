import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import Modal from "./(components)/Modal";
import AuthProvider from "./(components)/AuthProvider";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Contact App | Accueil",
  description: "Projet MMI",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(options);
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AuthProvider>
          <div className="mx-5 xl:mx-12">{children}</div>
          <Modal />
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
