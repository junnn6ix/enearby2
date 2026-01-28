import { Category } from "@/payload-types";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.find({
      collection: "categories",
      depth: 1, // populate subcategories, subcategories.[0] will be a type of 'Category'
      limit: 100, // Fetch all categories (default is 10)
      where: {
        parent: {
          exists: false,
        },
      },
      sort: "name",
    });

    const formatedData = data.docs.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
        // because of 'depth: 1', we are confident 'doc' will be a type of 'Category'
        ...(doc as Category),
        subcategories: undefined,
      })),
    }));

    return formatedData;
  }),
});
