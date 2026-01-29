"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerSchema } from "../../types";
import { z } from "zod";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { poppins } from "@/components/Navbar";

const SignIn = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    // mode: "all",
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log(values);
  };

  const username = form.watch("username");
  const usernameErrors = form.formState.errors.username;

  const showPreview = username && !usernameErrors;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6">
      <div className="bg-background h-screen w-full lg:col-span-2 overflow-y-auto p-8 lg:p-16">
        {/* TODO: add form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-between gap-4 h-full">
            {/* Header */}

            <div className="flex items-center justify-between mb-8">
              <Link href="/">
                <span className={cn("text-2xl font-bold", poppins.className)}>
                  eNearby
                </span>
              </Link>
              <Button
                asChild
                variant="ghost"
                className="text-base border-none underline">
                <Link prefetch href="/sign-up">
                  Sign Up
                </Link>
              </Button>
            </div>

            <h1 className="text-4xl font-medium">Hi!, Welcome Back</h1>

            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="elevated"
                className="mt-6 bg-black text-secondary dark:text-primary hover:bg-pink-400 dark:hover:bg-pink-400 hover:text-black dark:hover:text-black">
                Sign In
              </Button>
            </div>

            <span className="text-xs text-muted-foreground flex items-center justify-center gap-2 underline -mb-2 lg:-mb-6">
              <Link href="#">License Agreement</Link>
              <Link href="#">Privacy Policy</Link>
            </span>
          </form>
        </Form>
      </div>
      <div
        className="h-screen w-full lg:col-span-4 hidden lg:block bg-cover bg-center opacity-85"
        style={{
          backgroundImage: "url('/enearby-bg.png')",
        }}
      />
    </div>
  );
};

export default SignIn;
