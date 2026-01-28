"use client";

import Categories from "./Categories";
import SearchInput from "./SearchInput";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

const SearchFilters = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="px-8 md:px-12 lg:px-24 xl:px-48 py-4 border-b flex flex-col gap-4 w-full">
      <SearchInput />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
    </div>
  );
};

export default SearchFilters;

export const SearchFiltersSkeleton = () => {
  return (
    <div className="px-8 md:px-12 lg:px-24 xl:px-48 py-4 border-b flex flex-col gap-4 w-full">
      <SearchInput disabled />
      <div className="hidden lg:block">
        <div className="h-11" />
      </div>
    </div>
  );
};
