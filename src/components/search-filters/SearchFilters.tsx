import { CustomCategory } from "@/types";
import Categories from "./Categories";
import SearchInput from "./SearchInput";

interface Props {
  data: CustomCategory[];
}

const SearchFilters = ({ data }: Props) => {
  return (
    <div className="px-8 md:px-12 lg:px-24 xl:px-48 py-4 border-b flex flex-col gap-4 w-full">
      <SearchInput data={data} />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
    </div>
  );
};

export default SearchFilters;
