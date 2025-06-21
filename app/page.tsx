"use client";

import Categories from "@/app/ui/categories";
import QuestionLanguageToggle from "@/app/ui/question-language-toggle";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [selectedCategories, setSelectedCategories] = useState([] as string[]);

  const [
    selectedQuestionLanguage,
    setSelectedQuestionLanguage,
  ] = useState(["english"]);

  const pathname = usePathname();
  const { replace } = useRouter();

  function handleQuestionLanguageChange(questionLanguage: string[]) {
    if (!questionLanguage.length) return;
    setSelectedQuestionLanguage(questionLanguage);
  }

  function handleCategoryClick(category: string) {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
    else {
      setSelectedCategories(oldCategories => {
        return oldCategories.filter(oldCategory => oldCategory !== category);
      });
    }
  }

  function handleStartQuiz() {
    const newSearchParams = new URLSearchParams();

    for (const category of selectedCategories) {
      newSearchParams.append("categories", category);
    }

    newSearchParams.set("questionLanguage", selectedQuestionLanguage[0]);
    replace(`quiz/${pathname}?${newSearchParams}`);
  }

  return <div
    className="w-screen h-screen flex flex-col justify-center items-center bg-white"
  >
    <h1 className="mb-16 text-gray-600 text-4xl">Customise Quiz</h1>

    <div className="flex flex-col items-center gap-4 mb-16">
      <h2 className="text-gray-600 text-2xl">Categories</h2>

      <Categories
        selectedCategories={selectedCategories}
        onCategoryClick={handleCategoryClick}
      />
    </div>

    <div className="flex flex-col items-center gap-4 mb-16">
      <h2 className="text-gray-600 text-2xl">Question Language</h2>
      <QuestionLanguageToggle
        selectedQuestionLanguages={selectedQuestionLanguage}
        onValueChange={handleQuestionLanguageChange}
      />
    </div>

    <button
      className="p-4 text-white rounded-full cursor-pointer transition ease-in-out bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600"
      onClick={handleStartQuiz}
    >
      Start Quiz
    </button>
  </div>;
}