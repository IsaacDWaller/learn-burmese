import colours from "@/app/lib/quiz/colours.json";
import { Question } from "@/app/lib/quiz/definitions";

const categories: Record<string, () => Question> = {
    colours: getColoursQuestion,
    numbers: getNumbersQuestion,
};

export function getCategories(): string[] {
    return Object.keys(categories);
}

export function getQuestion(selectedCategories: string[]): Question {
    const index = Math.floor(Math.random() * selectedCategories.length);
    return categories[selectedCategories[index]]();
}

export function getColoursQuestion(): Question {
    return colours[Math.floor(Math.random() * colours.length)];
}

export function getNumbersQuestion(): Question {
    return { english: "zero", burmese: "thone nya" };
}