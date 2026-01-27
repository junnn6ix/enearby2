import { Category } from "@/payload-types";
import CategoryDropdown from "./CategoryDropdown";

interface Props {
  data: any;
}

function Categories({ data }: Props) {
  return (
    <div>
      {data.map((category: Category) => (
        <div key={category.id} className="">
          <CategoryDropdown
            category={category}
            isActive={false}
            isNavigationHovered={false}
          />
        </div>
      ))}
    </div>
  );
}

export default Categories;
