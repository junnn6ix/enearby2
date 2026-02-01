import ProductList, { ProductSkeleton } from "@/components/ProductList";
import { trpc } from "@/trpc/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: Promise<{ subcategory: string }>;
}

const Page = async ({ params }: Props) => {
  const { subcategory } = await params;

  const queryClient = new QueryClient();

  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      category: subcategory,
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductList category={subcategory} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
