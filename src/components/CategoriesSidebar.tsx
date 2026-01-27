import { CustomCategory } from "@/types";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { poppins } from "./Navbar";
import { ScrollArea } from "./ui/scroll-area";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CustomCategory[]; // TODO: change this later
}

const CategoriesSidebar = ({ open, onOpenChange, data }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="bg-background/70 backdrop-blur-lg w-[75vw]">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className={`${poppins.className} text-xl`}>
            Categories
          </SheetTitle>
        </SheetHeader>
        <ScrollArea></ScrollArea>
        <SheetFooter className={`${poppins.className} px-4 py-12`}>
          eNearby, Inc
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CategoriesSidebar;
