import Navbar from "@/components/navbar/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notificationicon from "@/components/home/notification-icon";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Notificationicon />
        <ToastContainer />
      </body>
    </html>
  );
}
