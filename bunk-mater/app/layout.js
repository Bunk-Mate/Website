import { Urbanist } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./_contexts/user_name";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata = {
  title: "Bunk-Mate",
  description: "An attendance tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
      </head>
      <body className={urbanist.className}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
