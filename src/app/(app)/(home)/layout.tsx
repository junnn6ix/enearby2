import SearchFilters, {
  SearchFiltersSkeleton,
} from "@/components/search-filters/SearchFilters";
import { TRPCReactProvider } from "@/trpc/client";
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
    <div className="flex flex-col min-h-screen">
      <div className="">
        <TRPCReactProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<SearchFiltersSkeleton />}>
              <SearchFilters />
            </Suspense>
          </HydrationBoundary>
          <div className="mx-auto w-[95vw] lg:w-[90vw]">{children}</div>
        </TRPCReactProvider>
      </div>
    </div>
  );
};

export default Layout;
