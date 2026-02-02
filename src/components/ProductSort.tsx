"use client";

import { useProductFilters } from "@/hooks/use-product-filters";
import { Button } from "./ui/button";

const ProductSort = () => {
  const [filters, setFilters] = useProductFilters();
  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant={filters.sort === "curated" ? "default" : "elevated"}
        className="rounded-full"
        onClick={() => setFilters({ sort: "curated" })}>
        Curated
      </Button>
      <Button
        size="sm"
        variant={filters.sort === "trending" ? "default" : "elevated"}
        className="rounded-full"
        onClick={() => setFilters({ sort: "trending" })}>
        Trending
      </Button>
      <Button
        size="sm"
        variant={filters.sort === "hot_and_new" ? "default" : "elevated"}
        className="rounded-full"
        onClick={() => setFilters({ sort: "hot_and_new" })}>
        Hot & New
      </Button>
    </div>
  );
};

export default ProductSort;
