"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import Header from "@/components/Header";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTER_QUESTIONS = [
  "AIってどんなものなの？",
  "AIはどうやって学ぶの？",
  "AIを使うときに気をつけることは？",
  "AIと人間のちがいは？",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages([...newMessages, assistantMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok || !res.body) {
        throw new Error("通信エラー");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "assistant", content: accumulated },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "assistant",
          content: "⚠️ エラーが発生しました。もう一度試してみてください。",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-4">
        {/* Info */}
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 mb-4 flex gap-3">
          <span className="text-2xl flex-shrink-0">🤖</span>
          <div>
            <p className="font-bold text-purple-800 text-sm">AIはかせと話してみよう！</p>
            <p className="text-purple-600 text-xs mt-0.5">
              AIのことなら何でも聞いてね。ただし、本名・住所・学校名などの個人情報は入力しないようにしよう！
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pb-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="text-5xl mb-3">🤖</div>
              <p className="text-slate-600 font-medium mb-1">AIはかせにきいてみよう！</p>
              <p className="text-slate-400 text-sm mb-6">下のボタンから質問を選ぶか、自由に入力してね</p>

              <div className="grid gap-2 sm:grid-cols-2">
                {STARTER_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-left bg-white border border-slate-200 hover:border-purple-300 hover:bg-purple-50 rounded-xl px-4 py-3 text-sm text-slate-700 transition-colors"
                  >
                    💬 {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm flex-shrink-0 mr-2 mt-1">
                  🤖
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-white border border-slate-100 text-slate-700 rounded-bl-sm shadow-sm"
                }`}
              >
                {msg.content}
                {msg.role === "assistant" && msg.content === "" && loading && (
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </span>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 bg-white border border-slate-200 rounded-2xl p-2 shadow-sm"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="AIについて質問しよう…"
            disabled={loading}
            className="flex-1 px-3 py-2 text-sm outline-none text-slate-700 placeholder-slate-400 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex-shrink-0"
          >
            送信
          </button>
        </form>
      </main>
    </div>
  );
}
