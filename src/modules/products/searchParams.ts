import {
  createLoader,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

const params = {
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

export const loadProductFilters = createLoader(params);
