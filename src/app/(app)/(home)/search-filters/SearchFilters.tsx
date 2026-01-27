import SearchInput from "./SearchInput";

interface Props {
  data: any;
}

const SearchFilters = ({ data }: Props) => {
  return (
    <div className="px-8 md:px-12 lg:px-24 xl:px-48 py-4 border-b flex flex-col gap-4 w-full">
      <SearchInput />
      {JSON.stringify(data, null, 2)}
    </div>
  );
};

export default SearchFilters;
