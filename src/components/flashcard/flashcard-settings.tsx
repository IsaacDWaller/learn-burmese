"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const languages = ["english", "burmese"];

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
        {languages.map((language) => (
          <ToggleGroupItem
            key={language}
            value={language}
            className={language === questionLanguage[0] ? "cursor-default" : ""}
          >
            {language.charAt(0).toUpperCase() + language.slice(1)}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
