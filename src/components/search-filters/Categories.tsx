import { Category } from "@/payload-types";
import CategoryDropdown from "./CategoryDropdown";
import { CustomCategory } from "@/types";

interface Props {
  data: CustomCategory[];
}

function Categories({ data }: Props) {
  return (
    <div className="relative w-full ">
      <div className="flex flex-nowrap items-center">
        {data.map((category) => (
          <div key={category.id} className="">
            <CategoryDropdown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
