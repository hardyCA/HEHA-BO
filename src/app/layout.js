import { Inter } from "next/font/google";
import "./globals.css";
import { ProductosProvider } from "./context/Context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HEHA",
  description: "Pollos HEHA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={inter.className}>
        <ProductosProvider>{children}</ProductosProvider>
      </body>
    </html>
  );
}
