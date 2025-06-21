"use client";

import Card from "@/app/ui/quiz/card";
import RoundButton from "@/app/ui/quiz/round-button";
import Link from "next/link";

interface QuizProps { questionLanguage: string };

export default function Quiz({ questionLanguage }: QuizProps) {
    return <div className="w-screen h-screen flex flex-col bg-white">
        <div
            className="h-20 p-4 bg-white flex justify-between items-center shadow-lg z-1"
        >
            <Link href="/">
                <RoundButton
                    colour="yellow"
                    symbol="arrow_back"
                    fontSize={24}
                    onClick={() => { }}
                />
            </Link>

            <p className="text-gray-600 text-4xl">Learn Burmese</p>
            <span></span>
        </div>

        <div
            className="flex flex-1 flex-col justify-center items-center bg-white"
        >
            <div className="mb-16">
                <Card questionLanguage={questionLanguage} />
            </div>

            <div className="flex gap-16">
                <RoundButton
                    colour="red"
                    symbol="close"
                    fontSize={48}
                    onClick={() => { }}
                />

                <RoundButton
                    colour="green"
                    symbol="check"
                    fontSize={48}
                    onClick={() => { }}
                />
            </div>
        </div>
    </div>;
}