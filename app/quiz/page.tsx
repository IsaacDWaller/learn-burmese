import Quiz from "@/app/ui/quiz/quiz";

interface PageProps { searchParams: Promise<{ questionLanguage: string }> };

export default async function Page({ searchParams }: PageProps) {
    const { questionLanguage } = await searchParams;
    return <Quiz questionLanguage={questionLanguage} />;
}