import { Button } from "@/components/ui/button";
import { type ComponentProps } from "react";

export default function FlashcardButton({
  visible,
  children,
  ...props
}: ComponentProps<typeof Button> & {
  visible?: boolean;
}) {
  return (
    <Button
      className={visible ? "cursor-pointer" : "pointer-events-none invisible"}
      {...props}
    >
      {children}
    </Button>
  );
}
