import configPromise from "@payload-config";
import { getPayload } from "payload";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import SearchFilters from "./(home)/search-filters/SearchFilters";
import { Category } from "@/payload-types";

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
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    depth: 1, // populate subcategories, subcategories.[0] will be a type of 'Category'
    where: {
      parent: {
        exists: false,
      },
    },
  });

  const formatedData = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      // because of 'depth: 1', we are confident 'doc' will be a type of 'Category'
      ...(doc as Category),
      subcategories: undefined,
    })),
  }));

  console.log({
    data,
    formatedData,
  });

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body className={`${dmSans.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <Navbar />
            <SearchFilters data={formatedData} />
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
