"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "ホーム", emoji: "🏠" },
  { href: "/learn", label: "学ぼう", emoji: "📖" },
  { href: "/quiz", label: "クイズ", emoji: "🎯" },
  { href: "/chat", label: "AIと話す", emoji: "💬" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <span className="font-bold text-blue-600 text-lg leading-tight">
            AIリテラシー
            <span className="block text-xs font-normal text-slate-500">for キッズ</span>
          </span>
        </Link>

        <nav className="flex gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className="text-lg">{item.emoji}</span>
                <span className="hidden sm:block">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
