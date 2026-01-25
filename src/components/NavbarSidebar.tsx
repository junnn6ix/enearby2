import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

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
      <SheetContent side="right" className="bg-background/70 backdrop-blur-lg">
        <SheetHeader className="p-4 border-b">
          <div className="text-2xl font-bold">
            <SheetTitle>eNearby</SheetTitle>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarSidebar;
