"use client";

import { useState } from "react";

interface CardProps { questionLanguage: string };

export default function Card({ questionLanguage }: CardProps) {
    const [shownLanguage, setShownLanguage] = useState(questionLanguage || "english");

    return <div
        className="relative w-64 h-32 flex flex-col justify-center items-center bg-white rounded-xl cursor-pointer select-none group transition ease-in-out shadow-lg  hover:shadow-xl active:shadow-md"
        onClick={() => setShownLanguage(oldShownLanguage => (
            oldShownLanguage === "english" ? "burmese" : "english")
        )}
    >
        <span className="absolute top-4 left-4 text-xl">
            {shownLanguage === "english" ? "🇦🇺" : "🇲🇲"}
        </span>

        <span className="text-lg text-gray-600">
            {shownLanguage === "english" ? "Zero" : "Thone nya"}
        </span>
    </div>;
}