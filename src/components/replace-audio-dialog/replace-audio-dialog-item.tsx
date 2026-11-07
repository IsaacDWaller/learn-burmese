import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import { PlayIcon } from "lucide-react";
import { useRef } from "react";

export default function ReplaceAudioDialogItem({
  title,
  disabled = false,
  audioBase64,
}: {
  title: string;
  disabled?: boolean;
  audioBase64: string | null;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  async function handlePlayAudio() {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(`data:audio/wav;base64,${audioBase64}`);
      }

      await audioRef.current.play();
    } catch {
      console.error("Failed to play audio");
    }
  }

  return (
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
      </ItemContent>

      <ItemActions>
        <Button
          disabled={!audioBase64 || disabled}
          variant="secondary"
          className="cursor-pointer"
          onClick={handlePlayAudio}
        >
          <PlayIcon />
          Play
        </Button>
      </ItemActions>
    </Item>
  );
}
