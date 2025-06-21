"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = ["numbers", "colours"];

export default function CategoryToggle() {
    const searchParams = useSearchParams();
    const selectedCategories = searchParams.getAll("categories");

    const pathname = usePathname();
    const { replace } = useRouter();

    function handleClick(name: string, enabled: boolean) {
        const newSearchParams = new URLSearchParams(searchParams);

        if (enabled) newSearchParams.delete("categories", name);
        else newSearchParams.append("categories", name);

        replace(`${pathname}?${newSearchParams}`);
    }

    return <div className="flex gap-8">
        {categories.map(category => {
            const enabled = selectedCategories.includes(category);

            return <button
                key={category}
                className={`p-4 rounded-full cursor-pointer transition ease-in-out ${enabled ? "bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white" : "text-blue-500 hover:text-blue-400 active:text-blue-600"} border-2 border-blue-500 hover:border-blue-400 active:border-blue-600`}
                onClick={() => handleClick(category, enabled)}
            >
                {`${category.charAt(0).toUpperCase()}${category.substring(1)}`}
            </button>
        })}
    </div>;
}