import { headers as getHeaders, cookies as getCookies } from "next/headers";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { AUTH_COOKIE } from "../constants";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();
    const session = await ctx.db.auth({ headers });

    return session;
  }),

  logout: baseProcedure.mutation(async () => {
    const cookies = await getCookies();
    cookies.delete(AUTH_COOKIE);
  }),

  register: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
        username: z
          .string()
          .min(3, "Username must be at least 3 characters long")
          .max(63, "Username must be at most 63 characters long")
          .regex(
            /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
            "Username must only contain lowercase letters, numbers, and underscores",
          )
          .refine(
            (val) => !val.includes("--"),
            "Username cannot contain consecutive hyphens",
          )
          .transform((val) => val.toLocaleLowerCase()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.create({
        collection: "users",
        data: {
          email: input.email,
          username: input.username,
          password: input.password,
        },
      });

      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        });
      }

      const cookies = await getCookies();
      cookies.set({
        name: AUTH_COOKIE,
        value: data.token,
        httpOnly: true,
        path: "/",
        // TODO: ensure cross-domain cookie sharing
        // enearby.com -> initial cookie
        // neckjun.enearby.com -> subdomain cookie (cookie does not exist here)
      });
    }),

  login: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        });
      }

      const cookies = await getCookies();
      cookies.set({
        name: AUTH_COOKIE,
        value: data.token,
        httpOnly: true,
        path: "/",
        // TODO: ensure cross-domain cookie sharing
        // enearby.com -> initial cookie
        // neckjun.enearby.com -> subdomain cookie (cookie does not exist here)
      });

      return data;
    }),
});
