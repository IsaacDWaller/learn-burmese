import Question from "@/app/ui/question";


interface PageProps { searchParams: Promise<{ questionLanguage: string }> };

export default async function Page({ searchParams }: PageProps) {
  const { questionLanguage } = await searchParams;

  return <Question questionLanguage={questionLanguage} />
}