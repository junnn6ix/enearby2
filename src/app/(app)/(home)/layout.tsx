import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SearchFilters, {
  SearchFiltersSkeleton,
} from "@/components/search-filters/SearchFilters";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<SearchFiltersSkeleton />}>
            <SearchFilters />
          </Suspense>
        </HydrationBoundary>
        <div className="mx-auto w-[95vw] lg:w-[90vw]">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
