"use client";

import { useState } from "react";

export function GitHubInput() {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    // 別タブでGitHubページを開く
    window.open(`/github/${username.trim()}`, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="GitHubユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
      />
      <button
        type="submit"
        disabled={!username.trim()}
        className={`px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center min-w-[120px] ${
          !username.trim()
            ? "opacity-50 cursor-not-allowed"
            : "hover:from-purple-600 hover:to-pink-600 transform hover:scale-105"
        }`}
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        生成
      </button>
    </form>
  );
}
