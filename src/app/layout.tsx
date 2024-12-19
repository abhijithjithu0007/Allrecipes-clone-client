import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "../components/Provider/SessionProvider";
import { ReduxProvider } from "@/components/Provider/reduxProvider";
import Mainnav from "@/components/navbar/main-nav";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        {/* <ReduxProvider>
          <SessionProvider session={session}>{children}</SessionProvider>
        </ReduxProvider> */}

        <Mainnav />
      </body>
    </html>
  );
}
