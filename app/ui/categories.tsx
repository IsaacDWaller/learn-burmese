"use client";

const categories = ["numbers", "colours"];

interface CategoriesProps {
    selectedCategories: string[],
    onCategoryClick: (category: string) => void,
};

export default function Categories({
    selectedCategories,
    onCategoryClick,
}: CategoriesProps) {
    return <div className="flex gap-8">
        {categories.map(category => {
            const enabled = selectedCategories.includes(category);

            return <button
                key={category}
                className={`p-4 rounded-full cursor-pointer transition ease-in-out ${enabled ? "bg-green-500 hover:bg-green-400 active:bg-green-600 text-white" : "text-red-500 hover:text-red-400 active:text-red-600"} border-2 ${enabled ? "border-green-500 hover:border-green-400 active:border-green-600" : "border-red-500 hover:border-red-400 active:border-red-600"}`}
                onClick={() => onCategoryClick(category)}
            >
                {`${category.charAt(0).toUpperCase()}${category.substring(1)}`}
            </button>
        })}
    </div>;
}