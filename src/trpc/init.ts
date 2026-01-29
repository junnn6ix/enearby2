import { cache } from "react";
import { initTRPC } from "@trpc/server";
import { getPayload } from "payload";
import config from "@payload-config";
import superjson from "superjson";

export const createTRPCContext = cache(async () => {
  /*
   *
   */
  return { userId: "user_123" };
});

const t = initTRPC.create({
  transformer: superjson,
});

// base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure.use(async ({ next }) => {
  const payload = await getPayload({ config });

  return next({ ctx: { db: payload } });
});
