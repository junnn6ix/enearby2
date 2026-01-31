"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Props {
  category?: string;
}

const ProductList = ({ category }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      category,
    }),
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {data?.docs.map((product) => (
        <div key={product.id} className="border bg-background p-4 rounded-md">
          <h2 className="text-xl font-medium">{product.name}</h2>
          <p className="font-bold">${product.price}</p>
          <p className="text-sm">{product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

export const ProductSkeleton = () => {
  return <div>Loading...</div>;
};
