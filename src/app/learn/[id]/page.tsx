import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { lessons } from "@/data/lessons";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return lessons.map((l) => ({ id: l.id }));
}

export default async function LessonPage({ params }: Props) {
  const { id } = await params;
  const lesson = lessons.find((l) => l.id === id);
  if (!lesson) notFound();

  const lessonIndex = lessons.findIndex((l) => l.id === id);
  const prevLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Back */}
        <Link
          href="/learn"
          className="inline-flex items-center gap-1 text-slate-500 hover:text-blue-600 mb-6 text-sm transition-colors"
        >
          ← もどる
        </Link>

        {/* Hero */}
        <div className={`bg-gradient-to-r ${lesson.color} rounded-2xl p-8 mb-8 text-white`}>
          <div className="text-5xl mb-3">{lesson.emoji}</div>
          <h1 className="text-2xl font-bold mb-1">{lesson.title}</h1>
          <p className="text-white/80 text-sm">{lesson.summary}</p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {lesson.sections.map((section, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i + 1}
                </span>
                {section.heading}
              </h2>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">{section.body}</p>
              {section.example && (
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-2">
                  <span className="text-xl flex-shrink-0">💡</span>
                  <p className="text-amber-800 text-sm leading-relaxed">{section.example}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex gap-3 justify-between">
          {prevLesson ? (
            <Link
              href={`/learn/${prevLesson.id}`}
              className="flex-1 bg-white border border-slate-200 rounded-xl p-4 text-left hover:border-blue-300 transition-colors"
            >
              <span className="text-xs text-slate-400 block mb-1">← 前のレッスン</span>
              <span className="font-medium text-slate-700 text-sm">{prevLesson.emoji} {prevLesson.title}</span>
            </Link>
          ) : <div className="flex-1" />}

          {nextLesson ? (
            <Link
              href={`/learn/${nextLesson.id}`}
              className="flex-1 bg-white border border-slate-200 rounded-xl p-4 text-right hover:border-blue-300 transition-colors"
            >
              <span className="text-xs text-slate-400 block mb-1">次のレッスン →</span>
              <span className="font-medium text-slate-700 text-sm">{nextLesson.emoji} {nextLesson.title}</span>
            </Link>
          ) : (
            <Link
              href="/quiz"
              className="flex-1 bg-blue-600 text-white rounded-xl p-4 text-center hover:bg-blue-700 transition-colors"
            >
              <span className="text-xs text-blue-200 block mb-1">全部読んだ！</span>
              <span className="font-bold">🎯 クイズに挑戦</span>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
