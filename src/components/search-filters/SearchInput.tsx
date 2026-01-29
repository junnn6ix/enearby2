"use client";

import { Input } from "@/components/ui/input";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import CategoriesSidebar from "../CategoriesSidebar";
import { useState } from "react";
import { Button } from "../ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  disabled?: boolean;
}

const SearchInput = ({ disabled }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const trpc = useTRPC();

  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <div className="flex items-center gap-3 w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 z-10 size-4" />
        <Input
          disabled={disabled}
          placeholder="Search..."
          className="pl-10 py-4.75 focus-visible:translate-x-0 focus-visible:translate-y-0 focus-visible:shadow-none dark:focus-visible:shadow-none dark:focus-visible:translate-x-0 dark:focus-visible:translate-y-0 focus-visible:ring-1 dark:focus-visible:ring-1"
        />
      </div>
      <Button
        variant="elevated"
        className="shrink-0 flex lg:hidden"
        onClick={() => setIsSidebarOpen(true)}>
        <ListFilterIcon />
      </Button>

      {session.data?.user && (
        <Button asChild variant="elevated">
          <Link href="/library">
            <BookmarkCheckIcon />
            Library
          </Link>
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
