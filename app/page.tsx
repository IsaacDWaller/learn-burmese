import Card from "@/app/ui/card";
import QuestionLanguageToggle from "@/app/ui/question-language-toggle";

interface PageProps { searchParams: Promise<{ questionLanguage: string }> };

export default async function Page({ searchParams }: PageProps) {
  const { questionLanguage } = await searchParams;

  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center bg-white"
    >
      <div className="mb-16">
        <QuestionLanguageToggle />
      </div>

      <Card questionLanguage={questionLanguage} />
    </div>
  );
}