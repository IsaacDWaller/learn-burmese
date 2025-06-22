"use client";

import { getQuestion } from "@/app/lib/quiz/data";
import Card from "@/app/ui/quiz/card";
import RoundButton from "@/app/ui/quiz/round-button";
import Link from "next/link";
import { useState } from "react";

interface QuizProps { categories: string[], questionLanguage: string };

export default function Quiz({ categories, questionLanguage }: QuizProps) {
    const [question, setQuestion] = useState(getQuestion(categories));
    const [language, setLanguage] = useState(questionLanguage);

    function handleCardClick() {
        setLanguage((language: string) => {
            return language === "english" ? "burmese" : "english"
        });
    }

    function handleButtonClick() {
        setQuestion(getQuestion(categories));
        setLanguage(questionLanguage);
    }

    return <div className="w-screen h-screen flex flex-col bg-white">
        <div
            className="h-20 p-4 bg-white flex justify-between items-center shadow-lg z-1"
        >
            <Link href="/">
                <RoundButton
                    colour="yellow"
                    symbol="arrow_back"
                    fontSize={24}
                />
            </Link>

            <p className="text-gray-600 text-4xl">Learn Burmese</p>
            <span></span>
        </div>

        <div
            className="flex flex-1 flex-col justify-center items-center bg-white"
        >
            <div className="mb-16">
                <Card
                    english={question.english}
                    burmese={question.burmese}
                    language={language}
                    onClick={handleCardClick}
                />
            </div>

            <div className="flex gap-16">
                <RoundButton
                    colour="red"
                    symbol="close"
                    fontSize={48}
                    onClick={handleButtonClick}
                />

                <RoundButton
                    colour="green"
                    symbol="check"
                    fontSize={48}
                    onClick={handleButtonClick}
                />
            </div>
        </div>
    </div>;
}