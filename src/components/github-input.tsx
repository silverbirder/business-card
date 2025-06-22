"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingOverlay } from "./loading-overlay";

export function GitHubInput() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    try {
      // 少し遅延を追加してローディング状態を確認しやすくする
      await new Promise(resolve => setTimeout(resolve, 800));
      router.push(`/github/${username.trim()}`);
    } catch (error) {
      console.error("Navigation error:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay isVisible={isLoading} />
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="GitHubユーザー名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all ${
            isLoading ? "opacity-50" : ""
          }`}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !username.trim()}
          className={`px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center min-w-[120px] ${
            isLoading
              ? "opacity-80 cursor-not-allowed"
              : "hover:from-purple-600 hover:to-pink-600 transform hover:scale-105"
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              生成中...
            </>
          ) : (
            <>
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
            </>
          )}
        </button>
      </form>
    </>
  );
}
