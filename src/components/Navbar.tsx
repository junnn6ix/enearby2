"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import NavbarSidebar from "./NavbarSidebar";
import { MenuIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant="outline"
      size="lg"
      className={cn(
        "rounded-full text-lg bg-background dark:bg-background px-3.5 border-transparent dark:border-transparent hover:bg-background hover:border-primary dark:hover:border-primary dark:hover:bg-background dark:hover:text-white ",
        isActive &&
          "bg-primary text-secondary hover:bg-primary/80 hover:border-primary/80 hover:text-secondary dark:text-black dark:bg-white dark:hover:bg-white dark:hover:text-black",
      )}>
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbarItems: NavbarItemProps[] = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="h-20 flex items-center justify-between border-b font-medium bg-background sticky top-0 z-50">
        <Link href="/" className="pl-12">
          <span
            className={cn(
              "text-2xl lg:text-5xl font-semibold",
              poppins.className,
            )}>
            eNearby
          </span>
        </Link>

        <div className="items-center gap-2 hidden lg:flex">
          {navbarItems.map((item) => (
            <NavbarItem
              key={item.href}
              href={item.href}
              isActive={pathname === item.href}>
              {item.children}
            </NavbarItem>
          ))}
        </div>

        <div className="hidden lg:flex items-center h-full">
          <ModeToggle />
          <Button
            asChild
            variant="secondary"
            className="border-l border-t-0 border-r-0 border-b-0 rounded-none h-full px-12 bg-background text-lg hover:bg-pink-400 transition-colors">
            <Link href="/sign-in">Log In</Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            className="border-l border-t-0 border-r-0 border-b-0 rounded-none h-full px-12 bg-black text-white dark:bg-white dark:text-black text-lg hover:bg-pink-400 dark:hover:bg-pink-400 hover:text-black dark:hover:text-black transition-colors">
            <Link href="/sign-up">Start Selling</Link>
          </Button>
        </div>

        <div className="h-full flex lg:hidden items-center justify-center pr-4">
          <ModeToggle />
          <Button
            variant="ghost"
            className="size-12 border-transparent bg-background h-full w-14"
            onClick={() => setIsSidebarOpen(true)}>
            <MenuIcon className="size-6" />
          </Button>
        </div>
      </nav>

      <NavbarSidebar
        items={navbarItems}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
    </>
  );
};

export default Navbar;
