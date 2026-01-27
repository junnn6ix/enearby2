import { Category } from "@/payload-types";
import { Button } from "@/components/ui/button";

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
  return (
    <Button variant="elevated" className="rounded-full">
      {category.name}
    </Button>
  );
};

export default CategoryDropdown;
