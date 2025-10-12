"use client";

import Category from "@/app/ui/category";
import "material-symbols";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const categories: { icon: string, text: string }[] = [
  { icon: "style", text: "Adjectives" },
  { icon: "palette", text: "Colours" },
  { icon: "category", text: "Nouns" },
  { icon: "numbers", text: "Numbers" },
  { icon: "bolt", text: "Verbs" },
];

export default function Page() {
  const [enabledCategories, setEnabledCategories] = useState<string[]>([...categories.map(category => category.text)]);

  function handleCategoryClick(clickedCategory: string) {
    setEnabledCategories(enabledCategories => {
      if (enabledCategories.length <= 1 && clickedCategory === enabledCategories[0]) return enabledCategories;

      if (enabledCategories.includes(clickedCategory)) {
        return enabledCategories.filter(enabledCategory => enabledCategory !== clickedCategory);
      }
      else return [...enabledCategories, clickedCategory];
    });
  }

  return <div className="w-screen h-screen flex flex-col gap-8 bg-slate-100">
    <header className="p-4 bg-slate-50 ring">
      <Link href="/" className="inline-flex flex-row items-center gap-4">
        <Image src="https://flagcdn.com/48x36/mm.png" width="48" height="36" alt="Myanmar" />
        <h1 className="text-4xl text-slate-900 select-none">Learn Burmese</h1>
      </Link>
    </header>

    <div className="flex flex-row">
      <aside className="w-64 flex flex-col gap-4 p-4">
        <h2 className="text-2xl text-slate-800">Categories</h2>

        <div className="flex flex-col gap-4">
          {categories.map(category => <Category
            key={category.text}
            icon={category.icon}
            text={category.text}
            enabled={enabledCategories.includes(category.text)}
            handleClick={() => handleCategoryClick(category.text)}
          />)}
        </div>
      </aside>
    </div>
  </div>;
}