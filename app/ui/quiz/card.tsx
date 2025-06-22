"use client";

interface CardProps {
    english: string,
    burmese: string,
    language: string,
    onClick: () => void,
};

export default function Card({
    english,
    burmese,
    language,
    onClick,
}: CardProps) {
    return <div
        className="relative w-96 h-48 flex flex-col justify-center items-center bg-white rounded-xl cursor-pointer select-none group transition ease-in-out shadow-lg  hover:shadow-xl active:shadow-md"
        onClick={onClick}
    >
        <span className="absolute top-4 left-4 text-4xl">
            {language === "english" ? "🇦🇺" : "🇲🇲"}
        </span>

        <span className="text-2xl text-gray-600">
            {language === "english" ? english : burmese}
        </span>
    </div>;
}