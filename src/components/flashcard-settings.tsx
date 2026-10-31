"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function FlashcardSettings({
  disabled,
  questionLanguage,
  onQuestionLanguageChange,
}: {
  disabled: boolean;
  questionLanguage: string[];
  onQuestionLanguageChange: (newQuestionLanguage: string[]) => void;
}) {
  return (
    <div className="mb-8">
      <h2 className="mb-2 text-center">Question Language</h2>

      <ToggleGroup
        disabled={disabled}
        value={questionLanguage}
        onValueChange={onQuestionLanguageChange}
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
