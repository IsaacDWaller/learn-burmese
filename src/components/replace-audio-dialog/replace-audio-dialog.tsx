import ReplaceAudioDialogItem from "@/components/replace-audio-dialog/replace-audio-dialog-item";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ItemGroup } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";

export default function ReplaceAudioDialog({
  open,
  existingAudio,
  newAudio,
  replacingAudio,
  onOpenChange,
  onReplaceAudio,
}: {
  open: boolean;
  existingAudio: string | null;
  newAudio: string | null;
  replacingAudio: boolean;
  onOpenChange: (open: boolean) => void;
  onReplaceAudio: () => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Replace Audio</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to replace the existing audio?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <ItemGroup>
          <ReplaceAudioDialogItem
            title="Existing audio"
            disabled={replacingAudio}
            audioBase64={existingAudio}
          />

          <ReplaceAudioDialogItem
            title="New audio"
            disabled={replacingAudio}
            audioBase64={newAudio}
          />
        </ItemGroup>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={replacingAudio}
            className="cursor-pointer"
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={replacingAudio}
            className="cursor-pointer"
            onClick={onReplaceAudio}
          >
            {replacingAudio ? <Spinner /> : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
