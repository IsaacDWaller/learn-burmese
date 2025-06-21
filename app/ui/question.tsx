"use client";

import Card from "@/app/ui/card";
import QuestionLanguageToggle from "@/app/ui/question-language-toggle";
import RoundButton from "@/app/ui/round-button";

interface QuestionProps { questionLanguage: string };

export default function Question({ questionLanguage }: QuestionProps) {
    return (
        <div
            className="w-screen h-screen flex flex-col justify-center items-center bg-white"
        >
            <div className="mb-16">
                <QuestionLanguageToggle />
            </div>

            <div className="mb-16">
                <Card questionLanguage={questionLanguage} />
            </div>

            <div className="flex gap-16">
                <RoundButton colour="red" symbol="close" onClick={() => { }} />
                <RoundButton colour="green" symbol="check" onClick={() => { }} />
            </div>
        </div>
    );
}