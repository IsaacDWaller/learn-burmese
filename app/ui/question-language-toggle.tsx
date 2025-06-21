"use client";

import { Toggle, ToggleGroup } from "@base-ui-components/react";

interface QuestionLanguageToggleProps {
    selectedQuestionLanguages: string[],
    onValueChange: (questionLanguage: string[]) => void,
};

export default function QuestionLanguageToggle({
    selectedQuestionLanguages,
    onValueChange,
}: QuestionLanguageToggleProps) {
    return <ToggleGroup
        value={selectedQuestionLanguages}
        className="flex gap-pxrounded-md border border-gray-200 bg-gray-50 p-0.5"
        onValueChange={onValueChange}
    >
        <Toggle
            value="english"
            className={`flex w-24 h-16 items-center justify-center rounded-sm text-gray-600 select-none hover:bg-gray-100 focus-visible:bg-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-200 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-900 ${selectedQuestionLanguages[0] !== "english" && "cursor-pointer"}`}
            aria-label="English"
        >
            English
        </Toggle>

        <Toggle
            value="burmese"
            className={`flex w-24 h-16 items-center justify-center rounded-sm text-gray-600 select-none hover:bg-gray-100 focus-visible:bg-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-200 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-900 ${selectedQuestionLanguages[0] !== "burmese" && "cursor-pointer"}`}
            aria-label="Burmese"
        >
            Burmese
        </Toggle>
    </ToggleGroup>;
}