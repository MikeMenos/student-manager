import Sidebar from "@/components/shared/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Providers } from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import { APP_NAME, PROD_URL } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(PROD_URL),

  title: APP_NAME,
  openGraph: {
    title: APP_NAME,
    url: PROD_URL,
    siteName: APP_NAME,
    images: "/images/logo.png",
    type: "website",
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <SidebarProvider>
            <Sidebar />
            <Providers>
              <SidebarInset>{children}</SidebarInset>
            </Providers>
            <Toaster
              toastOptions={{
                success: {
                  duration: 3000,
                  style: { padding: "1rem" },
                },
                error: {
                  duration: 3000,
                  style: { padding: "1rem" },
                },
                position: "bottom-center",
              }}
            />
          </SidebarProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
