import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Panda Manager",
  description: "Panda Express management application",
  icons: "/panda.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
