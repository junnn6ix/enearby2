import { Category } from "@/payload-types";

interface Props {
  category: Category;
  isOpen: boolean;
  position: { top: number; left: number };
}

const SubcategoryMenu = ({ category, isOpen, position }: Props) => {
  if (
    !isOpen ||
    !category.subcategories ||
    category.subcategories.length === 0
  ) {
    return null;
  }

  const backgroundColor = category.color || "bg-background";
  return (
    <div
      className="fixed z-10"
      style={{
        top: position.top,
        left: position.left,
      }}>
      {/* invisible bridge to maintain hover */}
      <div className="h-3 w-60" />
      <div className="w-60 text-primary rounded-md overflow-hidden border">
        <p>Subcategories</p>
      </div>
    </div>
  );
};

export default SubcategoryMenu;
