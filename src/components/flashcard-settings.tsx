"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function FlashcardSettings({
  questionLanguage,
  onQuestionLanguageChange,
  disabled,
}: {
  questionLanguage: string[];
  onQuestionLanguageChange: (newQuestionLanguage: string[]) => void;
  disabled: boolean;
}) {
  return (
    <div className="mb-8">
      <h2 className="mb-2 text-center">Question Language</h2>

      <ToggleGroup
        value={questionLanguage}
        onValueChange={onQuestionLanguageChange}
        disabled={disabled}
      >
        <ToggleGroupItem value="english" className="cursor-pointer">
          English
        </ToggleGroupItem>

        <ToggleGroupItem value="burmese" className="cursor-pointer">
          Burmese
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
