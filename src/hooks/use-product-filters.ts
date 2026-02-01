import { useQueryStates } from "nuqs";
import {
  createLoader,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const params = {
  minPrice: parseAsInteger.withOptions({
    clearOnDefault: true,
  }),
  maxPrice: parseAsInteger.withOptions({
    clearOnDefault: true,
  }),
  tags: parseAsArrayOf(parseAsString).withOptions({
    clearOnDefault: true,
  }),
};

export const useProductFilters = () => {
  return useQueryStates(params);
};

export const loadProductFilters = createLoader(params);
