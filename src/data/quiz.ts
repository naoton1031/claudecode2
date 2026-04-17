export interface QuizQuestion {
  id: number;
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "AI（エーアイ）を日本語でいうと何でしょう？",
    choices: ["人工ちのう", "自然ちのう", "コンピューター", "ロボット"],
    correctIndex: 0,
    explanation: "AIは「Artificial Intelligence」の頭文字で、日本語では「人工知能（じんこうちのう）」といいます。"
  },
  {
    id: 2,
    question: "AIが学習するためにひつようなものはどれ？",
    choices: ["電気", "たくさんのデータ", "水", "紙とえんぴつ"],
    correctIndex: 1,
    explanation: "AIはたくさんの「データ（例）」を見て学習します。これを「機械学習」といいます。"
  },
  {
    id: 3,
    question: "スマホに「OK Google」と話しかけて答えてくれるのは何のおかげ？",
    choices: ["電波", "AI", "Wifi", "バッテリー"],
    correctIndex: 1,
    explanation: "音声アシスタントには、人間の言葉を理解して答えるAIが使われています。"
  },
  {
    id: 4,
    question: "AIが「正しくない情報をもっともらしく話すこと」を何という？",
    choices: ["ウイルス", "バグ", "ハルシネーション", "エラー"],
    correctIndex: 2,
    explanation: "AIがウソの情報を正確そうに言ってしまうことを「ハルシネーション（幻覚）」といいます。AIの答えは必ず自分で確認しましょう。"
  },
  {
    id: 5,
    question: "動画サービスが「あなたへのおすすめ」を表示するのは？",
    choices: ["AIがあなたの視聴履歴を分析するから", "スタッフが選んでいるから", "ランダムに表示されるから", "友達が選んでいるから"],
    correctIndex: 0,
    explanation: "AIはあなたが見た動画をもとに、好みを予測して「おすすめ」を提示しています。"
  },
  {
    id: 6,
    question: "AIに話しかけるとき、しては「いけない」ことはどれ？",
    choices: ["天気を聞く", "料理レシピを調べる", "自分の住所や名前を教える", "おすすめの本を教えてもらう"],
    correctIndex: 2,
    explanation: "住所や名前などの「個人情報」はAIに教えないようにしましょう。入力した情報がどう使われるかわからないことがあります。"
  },
  {
    id: 7,
    question: "AIのしくみで、人間の脳の神経細胞をまねたものを何という？",
    choices: ["ロボット工学", "ニューラルネットワーク", "量子コンピューター", "インターネット"],
    correctIndex: 1,
    explanation: "「ニューラルネットワーク」は、人間の脳の神経細胞のつながりをまねて作られたAIのしくみです。"
  },
  {
    id: 8,
    question: "AIについて正しい説明はどれ？",
    choices: ["AIは自分で「やりたい」という気持ちを持つ", "AIは疲れることがある", "AIは人間に作られた道具のひとつ", "AIは感情を持っている"],
    correctIndex: 2,
    explanation: "AIは人間が作った道具です。感情や「やりたい」という意思はなく、疲れることもありません。"
  },
  {
    id: 9,
    question: "病院でAIが手伝っていることは何？",
    choices: ["手術をする", "薬をわたす", "レントゲン写真を見て病気を見つける", "患者と話す"],
    correctIndex: 2,
    explanation: "医療の現場ではAIがレントゲンなどの画像を分析して、医師が病気を見つける手伝いをしています。"
  },
  {
    id: 10,
    question: "AIを使う上でもっとも大切なことは？",
    choices: ["AIの言うことをすべて信じる", "AIに頼りすぎず、自分でも考える", "AIを使わないようにする", "AIに個人情報を全部教える"],
    correctIndex: 1,
    explanation: "AIはとても便利ですが、「道具」です。AIに頼りすぎず、自分でも考える力を大切にしましょう。AIを上手に使いこなすのはあなた自身です！"
  }
];
