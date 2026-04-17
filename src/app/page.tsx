import Link from "next/link";
import Header from "@/components/Header";

const features = [
  {
    href: "/learn",
    emoji: "📖",
    title: "AIを学ぼう",
    description: "AIのきほんや、どんなしくみか分かりやすく学べるよ！",
    color: "bg-blue-500",
    lightColor: "bg-blue-50 border-blue-200",
    textColor: "text-blue-700",
  },
  {
    href: "/quiz",
    emoji: "🎯",
    title: "クイズに挑戦",
    description: "学んだことをクイズで確かめよう！全問正解できるかな？",
    color: "bg-green-500",
    lightColor: "bg-green-50 border-green-200",
    textColor: "text-green-700",
  },
  {
    href: "/chat",
    emoji: "💬",
    title: "AIと話してみよう",
    description: "本物のAIと会話して、AIがどんなものか体験してみよう！",
    color: "bg-purple-500",
    lightColor: "bg-purple-50 border-purple-200",
    textColor: "text-purple-700",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-8 text-center">
        <div className="text-6xl mb-4">🤖</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
          AIリテラシー <span className="text-blue-600">for キッズ</span>
        </h1>
        <p className="text-slate-600 text-lg mb-2">
          AIってなに？どう使えばいいの？
        </p>
        <p className="text-slate-500 text-base">
          楽しく学んで、AIを上手に使いこなそう！
        </p>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className={`group block rounded-2xl border-2 p-6 transition-all hover:shadow-lg hover:-translate-y-1 ${f.lightColor}`}
            >
              <div className={`w-14 h-14 rounded-xl ${f.color} flex items-center justify-center text-3xl mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                {f.emoji}
              </div>
              <h2 className={`text-xl font-bold mb-2 ${f.textColor}`}>{f.title}</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{f.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Info banner */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 flex gap-3">
          <span className="text-2xl flex-shrink-0">💡</span>
          <div>
            <p className="font-bold text-amber-800 mb-1">AIリテラシーってなに？</p>
            <p className="text-amber-700 text-sm leading-relaxed">
              「AIリテラシー」とは、AIを正しく理解して、上手に・安全に使う力のことです。
              これからの時代、AIと上手につき合うことはとても大切なスキルになります。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
