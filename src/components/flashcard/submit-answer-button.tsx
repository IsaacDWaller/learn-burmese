import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Answer } from "@/types/answer";
import { cn } from "cn";
import { XIcon } from "lucide-react";

export default function SubmitAnswerButton({
  visible,
  answer,
  submittingAnswer,
  onSubmitAnswer,
  ...props
}: {
  visible: boolean;
  answer: "correct" | "incorrect";
  submittingAnswer: Answer;
  onSubmitAnswer: (isCorrect: boolean) => void;
} & React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn(!visible && "pointer-events-none invisible")}
      onClick={() => onSubmitAnswer(answer === "correct")}
      {...props}
    >
      {answer === submittingAnswer ? <Spinner /> : <XIcon />}
      {answer.charAt(0).toUpperCase() + answer.slice(1)}
    </Button>
  );
}
