import { CategoriesGetManyOutput } from "@/modules/categories/types";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { poppins } from "./Navbar";
import { ScrollArea } from "./ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CategoriesSidebar = ({ open, onOpenChange }: Props) => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.categories.getMany.queryOptions());

  const router = useRouter();
  const [parentCategories, setParentCategories] =
    useState<CategoriesGetManyOutput | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoriesGetManyOutput[1] | null
  >(null);

  // if we have parent categories, show those, otherwise show root categories
  const currentCategories = parentCategories ?? data ?? [];

  const handleOpenChange = (open: boolean) => {
    setSelectedCategory(null);
    setParentCategories(null);
    onOpenChange(open);
  };

  const handleCategoryClick = (category: CategoriesGetManyOutput[1]) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CategoriesGetManyOutput);
      setSelectedCategory(category);
    } else {
      if (parentCategories && selectedCategory) {
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      } else {
        if (category.slug === "all") {
          router.push("/");
        } else {
          router.push(`/${category.slug}`);
        }
      }

      handleOpenChange(false);
    }
  };

  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null);
      setSelectedCategory(null);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className="bg-background/70 backdrop-blur-lg w-[75vw]">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className={`${poppins.className} text-xl`}>
            Categories
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              className="w-full text-left p-4 hover:bg-primary hover:text-secondary flex items-center text-base font-medium"
              onClick={handleBackClick}>
              <ChevronLeft className="size-5 mr-2" />
              Back
            </button>
          )}
          {currentCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryClick(category)}
              className="w-full text-left p-4 hover:bg-primary hover:text-secondary flex items-center justify-between text-base font-medium cursor-pointer">
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRight className="size-5" />
              )}
            </button>
          ))}
        </ScrollArea>
        <SheetFooter className={`${poppins.className} px-4 py-12`}>
          eNearby, Inc
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CategoriesSidebar;
