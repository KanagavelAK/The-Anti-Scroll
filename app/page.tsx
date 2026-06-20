"use client";

import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [articleCount, setArticleCount] = useState("10"); // Direct string-format numeric input

  const triggerBot = async () => {
    setIsLoading(true);
    setStatusMessage("");

    // Keeping the request simple and direct
    const response = await fetch("YOUR_N8N_WEBHOOK_URL_HERE", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ article_count: articleCount }),
    });

    if (response.ok) {
      setStatusMessage("✅ Success! The bot is compiling your briefing on Discord.");
    } else {
      setStatusMessage(`❌ Error: Status code ${response.statusCode}`);
    }
    
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-8 text-center border border-gray-100 dark:border-gray-700">
        
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          📰 The Anti-Scroll
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Get the news. Close the app. Reclaim your morning.
        </p>

        <div className="mb-6 text-left">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Number of Articles (e.g., 10, 15)
          </label>
          <input
            type="text"
            value={articleCount}
            onChange={(e) => setArticleCount(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            placeholder="Enter a number"
          />
        </div>

        <button
          onClick={triggerBot}
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg transition-all transform hover:scale-[1.02] active:scale-95 flex justify-center items-center gap-3 ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30"
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Firing the n8n webhook...
            </>
          ) : (
            "Generate Daily Briefing"
          )}
        </button>

        {statusMessage && (
          <div className="mt-6 p-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 animate-fade-in font-medium">
            {statusMessage}
          </div>
        )}
      </div>
    </main>
  );
}