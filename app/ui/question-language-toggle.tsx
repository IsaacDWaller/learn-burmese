"use client";

import { Toggle, ToggleGroup } from "@base-ui-components/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function QuestionLanguageToggle() {
    const searchParams = useSearchParams();
    const selectedQuestionLanguage = searchParams.get("questionLanguage") || "english";

    const pathname = usePathname();
    const { replace } = useRouter();

    function onToggleChange(selectedQuestionLanguages: string[]) {
        if (!selectedQuestionLanguages.length) return;

        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("questionLanguage", selectedQuestionLanguages[0]);
        replace(`${pathname}?${newSearchParams}`);
    }

    return <ToggleGroup
        value={[searchParams.get("questionLanguage") || "english"]}
        className="flex gap-pxrounded-md border border-gray-200 bg-gray-50 p-0.5"
        onValueChange={onToggleChange}
    >
        <Toggle
            value="english"
            className={`flex w-24 h-16 items-center justify-center rounded-sm text-gray-600 select-none hover:bg-gray-100 focus-visible:bg-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-200 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-900 ${selectedQuestionLanguage !== "english" && "cursor-pointer"}`}
            aria-label="English"
        >
            English
        </Toggle>

        <Toggle
            value="burmese"
            className={`flex w-24 h-16 items-center justify-center rounded-sm text-gray-600 select-none hover:bg-gray-100 focus-visible:bg-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-200 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-900 ${selectedQuestionLanguage !== "burmese" && "cursor-pointer"}`}
            aria-label="Burmese"
        >
            Burmese
        </Toggle>
    </ToggleGroup>;
}