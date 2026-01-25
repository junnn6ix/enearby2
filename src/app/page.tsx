import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 py-12 max-w-2xl mx-auto">
      <h1 className="text-6xl tracking-tighter font-extrabold">Lorem ipsum</h1>
      <p className="text-lg line-clamp-3 max-w-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit sequi
        quasi temporibus esse et hic deleniti ex necessitatibus nihil, nobis
        porro, sapiente, expedita ipsam?
      </p>
      <div className="flex items-center gap-4">
        <Button>Button</Button>
        <Button variant="elevated">
          <Plus />
          Add
        </Button>
        <Button variant="elevateddestructive">
          <Trash />
          Delete
        </Button>
      </div>
      <div>
        <Input placeholder="Input..." />
      </div>
      <div>
        <Progress value={30} />
      </div>
      <div>
        <Textarea placeholder="Textarea..." />
      </div>
      <div>
        <Checkbox />
      </div>
    </div>
  );
}
