import { cn } from "@/lib/utils";
import { poppins } from "./Navbar";

const Footer = () => {
  return (
    <div
      className={cn(
        "w-full px-6 lg:px-24 py-12 bg-primary text-secondary/10 flex items-center text-4xl lg:text-6xl font-bold tracking-tighter",
        poppins.className,
      )}>
      eNearby
      <span className="text-secondary text-xs lg:text-xl tracking-normal ml-2">
        ecomms.
      </span>
    </div>
  );
};

export default Footer;
