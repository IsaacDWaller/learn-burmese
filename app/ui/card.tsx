"use client";

import { useState } from "react";

interface CardProps { questionLanguage: string };

export default function Card({ questionLanguage }: CardProps) {
    const [shownLanguage, setShownLanguage] = useState(questionLanguage);

    return <div
        className="relative w-64 h-32 flex flex-col justify-center items-center bg-white rounded-xl shadow-lg cursor-pointer select-none group transition ease-in-out hover:shadow-xl active:shadow-md"
        onClick={() => setShownLanguage(oldShownLanguage => (
            oldShownLanguage === "english" ? "burmese" : "english")
        )}
    >
        <span className="absolute top-4 left-4 text-xl">
            {shownLanguage === "english" ? "🇦🇺" : "🇲🇲"}
        </span>

        <span
            className="text-lg text-gray-600 transition ease-in-out"
        >
            {shownLanguage === "english" ? "Zero" : "Thone nya"}
        </span>
    </div>;
}