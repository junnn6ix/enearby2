import { Suspense } from "react";
import { ProductSkeleton } from "./ProductCard";
import ProductFilters from "./ProductFilters";
import ProductList from "./ProductList";
import ProductSort from "./ProductSort";

interface Props {
  category?: string;
}

const ProductListView = ({ category }: Props) => {
  return (
    <div className="py-6 lg:py-8 flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 justify-between">
        <p className="text-2xl font-medium">Curated for you</p>
        <ProductSort />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12">
        <div className="lg:col-span-2 xl:col-span-2">
          <ProductFilters />
        </div>
        <div className="lg:col-span-4 xl:col-span-6">
          <Suspense fallback={<ProductSkeleton />}>
            <ProductList category={category} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ProductListView;
