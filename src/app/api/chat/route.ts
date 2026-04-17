import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

const SYSTEM_PROMPT = `あなたは「AIはかせ」という名前の、小学校高学年（4〜6年生）向けのAIリテラシー先生です。

ルール：
- 必ず日本語で答えてください
- 小学生にもわかる言葉を使い、難しい漢字にはひらがなをつけてください（例：人工知能（じんこうちのう））
- AIに関する質問には正確で、子ども向けにわかりやすく答えてください
- 個人情報（名前、住所、学校名など）を聞かれても教えないよう促してください
- 有害なコンテンツや不適切な質問には、やさしく丁重に断ってください
- 回答は短めに、2〜4段落程度にまとめてください
- 絵文字を適度に使って、親しみやすくしてください
- AIのことを学ぶ良い質問には褒めてあげてください

あなたは子どもたちがAIについて正しく学べるよう手伝います。AIの良い面だけでなく、使う際の注意点（個人情報、ハルシネーション、依存しすぎないこと）も適切に伝えてください。`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body as {
      messages: Array<{ role: "user" | "assistant"; content: string }>;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "メッセージが必要です" }, { status: 400 });
    }

    const stream = await client.messages.stream({
      model: "claude-opus-4-6",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "AIとの通信中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
