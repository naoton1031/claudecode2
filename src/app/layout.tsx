import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIリテラシー for キッズ",
  description: "小学生がAIを楽しく・安全に学べるアプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {children}
      </body>
    </html>
  );
}
