import Quiz from "@/app/ui/quiz/quiz";

interface PageProps {
    searchParams: Promise<{
        categories: string[],
        questionLanguage: string,
    }>
};

export default async function Page({ searchParams }: PageProps) {
    const { categories, questionLanguage } = await searchParams;

    return <Quiz
        categories={Array.isArray(categories) ? categories : [categories]}
        questionLanguage={questionLanguage}
    />;
}