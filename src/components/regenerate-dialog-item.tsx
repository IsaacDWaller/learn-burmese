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
  replacingAudio,
}: {
  title: string;
  buttonContent: string;
  audioBase64: string | null;
  replacingAudio: boolean;
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
          disabled={!audioBase64 || replacingAudio}
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
