"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { quizQuestions } from "@/data/quiz";

type Phase = "start" | "playing" | "result";

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>("start");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongIds, setWrongIds] = useState<number[]>([]);

  const question = quizQuestions[current];
  const total = quizQuestions.length;

  function handleSelect(index: number) {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === question.correctIndex) {
      setScore((s) => s + 1);
    } else {
      setWrongIds((ids) => [...ids, question.id]);
    }
  }

  function handleNext() {
    if (current + 1 < total) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setPhase("result");
    }
  }

  function handleRestart() {
    setPhase("start");
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setWrongIds([]);
  }

  const percentage = Math.round((score / total) * 100);

  if (phase === "start") {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-12 text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h1 className="text-2xl font-bold text-slate-800 mb-3">AIリテラシー クイズ</h1>
          <p className="text-slate-600 mb-2">全 {total} 問のクイズに挑戦しよう！</p>
          <p className="text-slate-500 text-sm mb-8">学んだことをどれだけ覚えているか確かめよう</p>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8 text-left space-y-3">
            {[
              "4つの選択肢から1つを選ぼう",
              "答えたあとに解説が出るよ",
              "全問終わったら結果が出るよ",
            ].map((tip, i) => (
              <div key={i} className="flex gap-2 items-start text-slate-700 text-sm">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {tip}
              </div>
            ))}
          </div>

          <button
            onClick={() => setPhase("playing")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-3.5 rounded-xl text-lg transition-colors shadow-md"
          >
            スタート！
          </button>
        </main>
      </div>
    );
  }

  if (phase === "result") {
    const rank =
      percentage === 100
        ? { emoji: "🏆", label: "パーフェクト！！", color: "text-yellow-600" }
        : percentage >= 80
        ? { emoji: "🌟", label: "すばらしい！", color: "text-blue-600" }
        : percentage >= 60
        ? { emoji: "👍", label: "よくできました！", color: "text-green-600" }
        : { emoji: "📚", label: "もう少し！", color: "text-orange-600" };

    return (
      <div className="min-h-screen">
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-12 text-center">
          <div className="text-6xl mb-3">{rank.emoji}</div>
          <h1 className={`text-2xl font-bold mb-1 ${rank.color}`}>{rank.label}</h1>
          <p className="text-slate-600 mb-6">
            {total}問中 <span className="text-3xl font-bold text-slate-800">{score}</span> 問正解！
          </p>

          {/* Score bar */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
            <div className="flex justify-between text-sm text-slate-500 mb-2">
              <span>正解率</span>
              <span className="font-bold text-slate-700">{percentage}%</span>
            </div>
            <div className="bg-slate-100 rounded-full h-4 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {wrongIds.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 mb-6 text-left">
              <p className="font-bold text-orange-800 mb-3">もう一度確認しよう 📚</p>
              {quizQuestions
                .filter((q) => wrongIds.includes(q.id))
                .map((q) => (
                  <div key={q.id} className="mb-3 last:mb-0">
                    <p className="text-slate-700 text-sm font-medium">Q. {q.question}</p>
                    <p className="text-orange-700 text-sm mt-1">
                      ✅ 正解：{q.choices[q.correctIndex]}
                    </p>
                    <p className="text-slate-500 text-xs mt-1">{q.explanation}</p>
                  </div>
                ))}
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <button
              onClick={handleRestart}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              もう一度やる
            </button>
            <Link
              href="/learn"
              className="bg-white border border-slate-200 hover:border-blue-300 text-slate-700 font-bold px-6 py-3 rounded-xl transition-colors"
            >
              復習する
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-slate-500 mb-2">
            <span>問題 {current + 1} / {total}</span>
            <span>正解数: {score}</span>
          </div>
          <div className="bg-slate-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${((current) / total) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-4">
          <p className="text-lg font-bold text-slate-800 leading-relaxed">
            Q{current + 1}. {question.question}
          </p>
        </div>

        {/* Choices */}
        <div className="grid gap-3 mb-4">
          {question.choices.map((choice, i) => {
            let className =
              "w-full text-left p-4 rounded-xl border-2 font-medium transition-all text-sm ";
            if (!answered) {
              className += "border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50 cursor-pointer";
            } else if (i === question.correctIndex) {
              className += "border-green-400 bg-green-50 text-green-800";
            } else if (i === selected && i !== question.correctIndex) {
              className += "border-red-400 bg-red-50 text-red-800";
            } else {
              className += "border-slate-100 bg-slate-50 text-slate-400 cursor-default";
            }

            return (
              <button
                key={i}
                className={className}
                onClick={() => handleSelect(i)}
                disabled={answered}
              >
                <span className="inline-flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {["A", "B", "C", "D"][i]}
                  </span>
                  {choice}
                  {answered && i === question.correctIndex && " ✅"}
                  {answered && i === selected && i !== question.correctIndex && " ❌"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
            <p className="text-sm font-bold text-blue-800 mb-1">
              {selected === question.correctIndex ? "🎉 正解！" : "❌ ざんねん…"}
            </p>
            <p className="text-blue-700 text-sm leading-relaxed">{question.explanation}</p>
          </div>
        )}

        {answered && (
          <button
            onClick={handleNext}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors"
          >
            {current + 1 < total ? "次の問題へ →" : "結果を見る 🎯"}
          </button>
        )}
      </main>
    </div>
  );
}
