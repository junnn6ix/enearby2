"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { useDropdownPosition } from "@/hooks/use-dropdown-position";
import { cn } from "@/lib/utils";
import { CategoriesGetManyOutput } from "@/modules/categories/types";
import Link from "next/link";
import SubcategoryMenu from "./SubcategoryMenu";

interface Props {
  category: CategoriesGetManyOutput[1];
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

const CategoryDropdown = ({
  category,
  isActive,
  // isNavigationHovered,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getDropdownPosition } = useDropdownPosition(dropdownRef);

  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true);
    }
  };

  const onMouseLeave = () => setIsOpen(false);

  const dropdownPosition = getDropdownPosition();

  // TODO: potentially improved mobile experience
  // const toggleDropdown = () => {
  //   if (category.subcategories?.length) {
  //     setIsOpen(!isOpen);
  //   }
  // };

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      // onClick={toggleDropdown}
    >
      <div className="relative ">
        <Button
          variant="elevated"
          className={cn(
            "bg-transparent rounded-full border-transparent dark:border-transparent hover:border-primary dark:hover:border-primary h-11 px-4 hover:bg-background",
            isActive && "bg-background border-primary dark:border-primary",
            isOpen &&
              "bg-background border-primary dark:border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-1 -translate-y-1 border dark:bg-background dark:shadow-primary cursor-pointer",
          )}>
          <Link href={`/${category.slug === "all" ? "" : category.slug}`}>
            {category.name}
          </Link>
        </Button>
        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              "opacity-0 absolute -bottom-3 w-0 h-0 border-l-10 border-r-10 border-b-10 border-l-transparent border-r-transparent border-b-primary left-1/2 -translate-x-1/2",
              isOpen && "opacity-100",
            )}
          />
        )}
      </div>

      <SubcategoryMenu
        category={category}
        isOpen={isOpen}
        position={dropdownPosition}
      />
    </div>
  );
};

export default CategoryDropdown;
