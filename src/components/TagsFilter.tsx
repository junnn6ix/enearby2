import { DEFAULT_LIMIT } from "@/constant";
import { useTRPC } from "@/trpc/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Hash, LoaderIcon } from "lucide-react";
import { Button } from "./ui/button";

interface TagsFilterProps {
  value?: string[] | null;
  onChange: (value: string[]) => void;
}

const TagsFilter = ({ value, onChange }: TagsFilterProps) => {
  const trpc = useTRPC();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      trpc.tags.getMany.infiniteQueryOptions(
        {
          limit: DEFAULT_LIMIT,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
          },
        },
      ),
    );

  const onClick = (tag: string) => {
    if (value?.includes(tag)) {
      onChange(value?.filter((t) => t !== tag) || []);
    } else {
      onChange([...(value || []), tag]);
    }
  };
  return (
    <div className="flex flex-wrap gap-2">
      {isLoading ? (
        <div className="w-full flex items-center justify-center p-4">
          <LoaderIcon className="size-4 animate-spin" />
        </div>
      ) : (
        data?.pages.map((page) =>
          page.docs.map((tag) => (
            <Button
              key={tag.id}
              className="cursor-pointer rounded-full"
              onClick={() => onClick(tag.name)}
              variant={"outline"}
              size="sm">
              <Hash />
              <p>{tag.name}</p>
            </Button>
          )),
        )
      )}
      {hasNextPage && (
        <Button
          variant="ghost"
          className="underline "
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}>
          Load More...
        </Button>
      )}
    </div>
  );
};

export default TagsFilter;
