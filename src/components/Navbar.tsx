import Link from "next/link";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import React, { Children } from "react";
import { Button } from "./ui/button";

const poppins = Poppins({
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
      className={cn(
        "rounded-full text-lg bg-background px-3.5 border-transparent hover:bg-background hover:border-primary ",
        isActive &&
          "bg-primary text-secondary hover:bg-primary hover:border-primary",
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
  return (
    <nav className="h-20 flex items-center justify-between border-b font-medium bg-white">
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
          <NavbarItem key={item.href} href={item.href}>
            {item.children}
          </NavbarItem>
        ))}
      </div>

      <div className="h-full flex items-center">
        <Link
          href="#"
          className="h-full flex items-center justify-center px-12 border-l hover:bg-primary hover:text-secondary transition-colors">
          Sign In
        </Link>
        <Link
          href="#"
          className="h-full flex items-center justify-center bg-pink-400 border-l px-12 hover:bg-pink-400/80 transition-colors">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
