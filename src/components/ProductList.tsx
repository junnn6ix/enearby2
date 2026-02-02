"use client";

import { DEFAULT_LIMIT } from "@/constant";
import { useProductFilters } from "@/hooks/use-product-filters";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { InboxIcon } from "lucide-react";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";
import { Button } from "./ui/button";

interface Props {
  category?: string;
}

const ProductList = ({ category }: Props) => {
  const [filters] = useProductFilters();

  const trpc = useTRPC();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(
      trpc.products.getMany.infiniteQueryOptions(
        {
          category,
          ...filters,
          limit: DEFAULT_LIMIT,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
          },
        },
      ),
    );

  if (data.pages?.[0]?.docs.length === 0) {
    return (
      <div className="border border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-background w-full rounded-lg">
        <InboxIcon />
        <p className="font-medium text-base">No products found</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {data?.pages
          .flatMap((page) => page.docs)
          .map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.image?.url}
              authorUsername="neckjs"
              authorImageUrl={undefined}
              reviewRating={5}
              reviewCount={10}
              price={product.price}
            />
          ))}
      </div>
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          variant="elevated"
          className="my-4 rounded-full">
          Load more
        </Button>
      )}
    </>
  );
};

export default ProductList;

export const ProductListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};
