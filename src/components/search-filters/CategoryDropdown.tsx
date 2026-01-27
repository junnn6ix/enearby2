"use client";

import { useRef, useState } from "react";

import { Category } from "@/payload-types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useDropdownPosition } from "@/hooks/use-dropdown-position";
import SubcategoryMenu from "./SubcategoryMenu";

interface Props {
  category: Category;
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
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

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <div className="relative">
        <Button
          variant="elevated"
          className={cn(
            "rounded-full border-transparent dark:border-transparent hover:border-primary dark:hover:border-primary h-11 px-4 hover:bg-background",
            isActive && isNavigationHovered && "bg-background border-primary",
            isOpen &&
              "bg-background border-primary dark:border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[4px] border dark:bg-background dark:shadow-primary cursor-pointer",
          )}>
          {category.name}
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
