import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import { PlayIcon } from "lucide-react";

export default function RegenerateDialogItem({
  title,
  buttonContent,
  audioBase64,
}: {
  title: string;
  buttonContent: string;
  audioBase64: string | null;
}) {
  function handlePlayButtonClick() {
    if (!audioBase64) return;
    new Audio(`data:audio/mp3;base64,${audioBase64}`).play();
  }

  return (
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
      </ItemContent>

      <ItemActions>
        <Button
          disabled={!audioBase64}
          variant="secondary"
          className="cursor-pointer"
          onClick={handlePlayButtonClick}
        >
          <PlayIcon />
          {buttonContent}
        </Button>
      </ItemActions>
    </Item>
  );
}
