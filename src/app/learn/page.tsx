import Link from "next/link";
import Header from "@/components/Header";
import { lessons } from "@/data/lessons";

export default function LearnPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">📖 AIを学ぼう</h1>
          <p className="text-slate-600">4つのテーマからAIのことを学んでいこう！</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {lessons.map((lesson, i) => (
            <Link
              key={lesson.id}
              href={`/learn/${lesson.id}`}
              className="group block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className={`bg-gradient-to-r ${lesson.color} p-5`}>
                <span className="text-4xl">{lesson.emoji}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    レッスン {i + 1}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                  {lesson.title}
                </h2>
                <p className="text-slate-500 text-sm">{lesson.summary}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
          <p className="text-blue-700 font-medium mb-3">全部読んだら、クイズに挑戦しよう！</p>
          <Link
            href="/quiz"
            className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            🎯 クイズへ
          </Link>
        </div>
      </main>
    </div>
  );
}
