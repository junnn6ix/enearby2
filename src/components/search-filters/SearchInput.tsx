"use client";

import { Input } from "@/components/ui/input";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import CategoriesSidebar from "../CategoriesSidebar";
import { useState } from "react";
import { Button } from "../ui/button";

interface Props {
  disabled?: boolean;
}

const SearchInput = ({ disabled }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 z-10 size-4" />
        <Input
          disabled={disabled}
          placeholder="Search..."
          className="pl-10 focus-visible:translate-x-0 focus-visible:translate-y-0 focus-visible:shadow-none dark:focus-visible:shadow-none dark:focus-visible:translate-x-0 dark:focus-visible:translate-y-0 focus-visible:ring-1 dark:focus-visible:ring-1"
        />
      </div>
      {/* TODO: All Categories btn  */}
      <Button
        variant="elevated"
        className="size-9 shrink-0 flex lg:hidden"
        onClick={() => setIsSidebarOpen(true)}>
        <ListFilterIcon />
      </Button>
      {/* TODO: Category filter */}
    </div>
  );
};

export default SearchInput;
