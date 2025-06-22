"use client";

import { useEffect, useState } from "react";

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export function LoadingOverlay({ isVisible, message = "生成中..." }: LoadingOverlayProps) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 text-center">
        <div className="w-16 h-16 mx-auto mb-6">
          <svg
            className="animate-spin w-16 h-16 text-purple-400"
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
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {message}{dots}
        </h3>
        <p className="text-gray-300">
          GitHubプロフィールを取得しています
        </p>
        <div className="mt-4 w-48 bg-white/20 rounded-full h-2 mx-auto">
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
