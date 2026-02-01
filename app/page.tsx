"use client";

import { CheckIcon } from "@/app/_components/CheckIcon";
import Flashcard from "@/app/_components/Flashcard";
import { classNames } from "@/lib/class-name-generator";
import { titleCase } from "@/lib/string-formatter";
import { Language } from "@/types/Language";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import Image from "next/image";
import { useState } from "react";

interface LanguageToggle {
  language: Language;
  flagPath: string;
}

const languageToggles: LanguageToggle[] = [
  { language: Language.English, flagPath: "/union-jack.svg" },
  { language: Language.Burmese, flagPath: "/flag-of-myanmar.svg" },
];

interface Category {
  icon: string;
  value: string;
}

const categories: Category[] = [
  { icon: "palette", value: "adjectives" },
  { icon: "bolt", value: "verbs" },
  { icon: "calculate", value: "numbers" },
];

export default function Page() {
  const [activeQuestionLanguageToggles, setActiveQuestionLanguageToggles] =
    useState<Language[]>([languageToggles[0].language]);

  const [activeCategoryToggles, setActiveCategoryToggles] = useState<string[]>(
    categories.map((category) => category.value),
  );

  return (
    <div className="flex min-h-0 flex-1">
      <aside className="border-e border-gray-700 bg-gray-900 ps-8 pe-4 pt-4">
        <section>
          <h2 className="mb-2 text-xs text-gray-400">Question Language</h2>

          <ToggleGroup
            value={activeQuestionLanguageToggles}
            className="flex w-64 flex-row"
            onValueChange={setActiveQuestionLanguageToggles}
          >
            {languageToggles.map((toggle, index) => (
              <Toggle
                key={toggle.language}
                aria-label={toggle.language}
                value={toggle.language}
                className={classNames(
                  "group flex flex-1 justify-center p-2",
                  index <= 0 ? "rounded-s-md" : "rounded-e-md",
                  activeQuestionLanguageToggles.includes(toggle.language)
                    ? "bg-gray-800 text-white"
                    : "cursor-pointer transition-all ease-in-out hover:bg-gray-800",
                )}
              >
                <Image
                  src={toggle.flagPath}
                  className="w-6 rounded-sm"
                  width="48"
                  height="32"
                  alt={titleCase(toggle.language)}
                />

                <span
                  className={classNames(
                    "ms-2 text-sm",
                    activeQuestionLanguageToggles.includes(toggle.language)
                      ? "text-white"
                      : "text-gray-400 transition-all ease-in-out group-hover:text-white",
                  )}
                >
                  {titleCase(toggle.language)}
                </span>
              </Toggle>
            ))}
          </ToggleGroup>
        </section>

        <section className="mt-8">
          <h2 className="mb-2 text-xs text-gray-400">Categories</h2>

          <ToggleGroup
            value={activeCategoryToggles}
            className="flex flex-col"
            onValueChange={setActiveCategoryToggles}
            multiple
          >
            <ul className="space-y-1">
              {categories.map((category) => (
                <li key={category.value}>
                  <Toggle
                    aria-label={titleCase(category.value)}
                    value={category.value}
                    className="group flex w-64 cursor-pointer items-center justify-between rounded-md p-2 text-gray-400 transition-all ease-in-out select-none hover:bg-gray-800 hover:text-white data-pressed:bg-gray-800 data-pressed:text-white"
                  >
                    <label className="flex cursor-pointer items-center">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "24px" }}
                      >
                        {category.icon}
                      </span>

                      <span className="ms-2 text-sm">
                        {titleCase(category.value)}
                      </span>
                    </label>

                    <div
                      className={classNames(
                        "flex size-5 items-center justify-center rounded-sm transition-all ease-in-out",
                        activeCategoryToggles.includes(category.value)
                          ? "bg-white"
                          : "border border-gray-400 group-hover:border-white",
                      )}
                    >
                      <CheckIcon className="flex size-3 text-gray-900 transition-all ease-in-out group-hover:text-gray-800" />
                    </div>
                  </Toggle>
                </li>
              ))}
            </ul>
          </ToggleGroup>
        </section>
      </aside>

      <main className="flex w-full bg-gray-800">
        <Flashcard
          questionLanguage={activeQuestionLanguageToggles[0]}
          answerLanguage={
            activeQuestionLanguageToggles[0] === Language.English
              ? Language.Burmese
              : Language.English
          }
          className="m-4 flex-1"
        />
      </main>
    </div>
  );
}
