# GitHub Business Card

動的なGitHub名刺を生成するNext.jsアプリケーションです。GitHubのユーザー情報、リポジトリ統計、アクティビティ履歴などを美しい名刺形式で表示します。

## 🌟 特徴

- **動的名刺生成**: GitHubユーザー名を指定するだけで美しい名刺を自動生成

## 🚀 使用方法

アプリケーションをデプロイ後、以下のURLでGitHub名刺にアクセスできます：

```
https://digital-meishi.vercel.app/github/[GitHubユーザー名]
```

例：`https://digital-meishi.vercel.app/github/octocat`

## 🛠️ 技術スタック

このプロジェクトは[T3 Stack](https://create.t3.gg/)をベースに構築されています：

- **[Next.js](https://nextjs.org)** - Reactフレームワーク
- **[TypeScript](https://www.typescriptlang.org/)** - 型安全性
- **[Tailwind CSS](https://tailwindcss.com)** - スタイリング
- **[tRPC](https://trpc.io)** - API型安全性
- **[Octokit](https://github.com/octokit/octokit.js)** - GitHub API クライアント
- **[Next/OG](https://nextjs.org/docs/app/api-reference/functions/image-response)** - 動的画像生成

## 📋 前提条件

- Node.js 18.x以上
- GitHub Personal Access Token（APIアクセス用）

## ⚙️ セットアップ

1. リポジトリをクローン：

```bash
git clone https://github.com/silverbirder/business-card.git
cd business-card
```

2. 依存関係をインストール：

```bash
npm install
```

3. 環境変数を設定：

```bash
cp .env.example .env
```

`.env`に以下を追加：

```env
GITHUB_TOKEN=your_github_personal_access_token
```

4. 開発サーバーを起動：

```bash
npm run dev
```

## 🔗 関連リンク

- [T3 Stack ドキュメント](https://create.t3.gg/)
- [Next.js ドキュメント](https://nextjs.org/docs)
- [GitHub API ドキュメント](https://docs.github.com/en/rest)
