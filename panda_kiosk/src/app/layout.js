import "./globals.css";
// import { OrderProvider } from '@/context/OrderContext';
import { GlobalStateProvider } from "@/components/GlobalStateProvider";
import { MagnifierProvider } from "@/context/MagnifierContext";

export const metadata = {
  title: "Panda Kiosk",
  description: "Panda Express Point of Sale System",
  icons: "panda.svg"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`} >
        <GlobalStateProvider>
          <MagnifierProvider>{children}</MagnifierProvider>
        </GlobalStateProvider>
        {/* <OrderProvider>{children}</OrderProvider> */}
      </body>
    </html>
  );
}
