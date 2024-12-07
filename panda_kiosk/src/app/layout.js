import "./globals.css";
// import { OrderProvider } from '@/context/OrderContext';
import { GlobalStateProvider } from "@/components/GlobalStateProvider";

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
          {children}
        </GlobalStateProvider>
        {/* <OrderProvider>{children}</OrderProvider> */}
      </body>
    </html>
  );
}
