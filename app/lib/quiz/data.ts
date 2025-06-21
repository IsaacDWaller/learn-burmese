import colours from "@/app/lib/quiz/colours.json";
import { Question } from "@/app/lib/quiz/definitions";

const categories: Record<string, () => Question> = {
    colours: getColoursQuestion,
    numbers: getNumbersQuestion,
};

export function getCategories(): string[] {
    return Object.keys(categories);
}

export function getQuestion(category: string): Question {
    return categories[category]();
}

export function getColoursQuestion(): Question {
    return colours[Math.floor(Math.random() * colours.length)];
}

export function getNumbersQuestion(): Question {
    return { english: "zero", burmese: "thone nya" };
}