import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-muted-foreground focus-visible:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-visible:-translate-x-[4px]  focus-visible:-translate-y-[4px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-background flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-all duration-300 dark:focus-visible:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:focus-visible:-translate-x-[4px] dark:focus-visible:-translate-y-[4px] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
