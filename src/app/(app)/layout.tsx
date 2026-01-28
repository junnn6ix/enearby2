import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import SearchFilters from "@/components/search-filters/SearchFilters";
import { TRPCReactProvider } from "@/trpc/client";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Enearby",
  description: "Enearby",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body className={`${dmSans.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <TRPCReactProvider>
              <Navbar />
              <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<div>Loading...</div>}>
                  <SearchFilters />
                </Suspense>
              </HydrationBoundary>
              {children}
              <Footer />
            </TRPCReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
