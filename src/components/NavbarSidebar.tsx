import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { ChevronRight, Copyright } from "lucide-react";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}

interface Props {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NavbarSidebar = ({ items, open, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="bg-background/70 backdrop-blur-lg w-[75vw]">
        <SheetHeader className="p-4 border-b ">
          <div className="text-2xl font-bold">
            <SheetTitle>eNearby</SheetTitle>
          </div>
        </SheetHeader>

        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-full text-left p-4 hover:bg-primary hover:text-secondary flex items-center justify-between"
              onClick={() => onOpenChange(false)}>
              {item.children}
              <ChevronRight />
            </Link>
          ))}
          <div className="text-left border-t rounded-none w-full p-4 bg-transparent text-base hover:bg-primary hover:text-secondary cursor-pointer transition-colors mt-4">
            <Link href="/sign-in">Log In</Link>
          </div>
          <div className="text-left border-b rounded-none w-full p-4 bg-transparent text-primary text-base hover:bg-pink-400 hover:text-primary cursor-pointer transition-colors">
            <Link href="/sign-up">Start Selling</Link>
          </div>
        </ScrollArea>
        <SheetFooter className="p-0 gap-0">
          <span className="flex items-center gap-1 text-sm my-12 p-4 text-muted-foreground">
            <Copyright className="size-3" /> 2026
            <span className="font-bold text-primary">eNearby</span>
            ecomms.
          </span>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarSidebar;
