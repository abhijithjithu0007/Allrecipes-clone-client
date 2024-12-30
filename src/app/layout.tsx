import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "../components/Provider/SessionProvider";
import { ReduxProvider } from "@/components/Provider/reduxProvider";
import ReactQueryProvider from "@/components/Provider/queryProvided";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ReduxProvider>
            <SessionProvider session={session}>{children}</SessionProvider>
          </ReduxProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
