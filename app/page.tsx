"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [url, setUrl] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);
  const [confetti, setConfetti] = useState<
    { id: number; left: number; bg: string; delay: number }[]
  >([]);

  const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#C77DFF"];

  const spawnConfetti = (count = 18) => {
    const pieces = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.round(Math.random() * 100),
      bg: colors[Math.floor(Math.random() * colors.length)],
      delay: Number((Math.random() * 0.6).toFixed(2)),
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      return;
    }

    setLoading(true);
    setRoast("");

    try {
      const response = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (response.ok) {
        setRoast(data.roast);
        spawnConfetti(22);
      } else {
        setRoast(data.error);
      }
    } catch (error) {
      setRoast("Your site was so bad it broke prod.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black transition-colors">
      <main className="w-full max-w-3xl flex flex-col items-center py-24 px-6 sm:px-12 bg-white dark:bg-black rounded-2xl shadow-2xl overflow-hidden relative">
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-3xl font-extrabold text-black dark:text-zinc-50 leading-tight">
            Let&apos;s roast your site:
            <span className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
              Brutal, funny, and slightly unfair.
            </span>
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md"
          aria-label="Roast form"
        >
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL (e.g. example.com)"
              className="px-4 py-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400 transition-transform transform-gpu hover:scale-[1.01]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="relative overflow-hidden px-4 py-3 bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-lg font-semibold shadow-xl hover:scale-[1.02] active:scale-95 disabled:opacity-60 transition-all flex items-center justify-center gap-3"
          >
            <span>
              {loading ? (
                <span className="flex items-center gap-1">
                  Roasting
                  <span className="dots">
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                  </span>
                </span>
              ) : (
                "Roast It!"
              )}
            </span>
          </button>
        </form>

        {roast && (
          <div className="mt-10 w-full max-w-2xl relative">
            {confetti.map((c) => (
              <span
                key={c.id}
                style={{
                  left: `${c.left}%`,
                  background: c.bg,
                  animationDelay: `${c.delay}s`,
                }}
                className="confetti-piece"
                aria-hidden
              />
            ))}

            <div className="mt-2 p-6 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700 shadow-2xl transform animate-slide-in">
              <div className="flex items-start gap-4">
                <div className="text-3xl animate-wobble">💬</div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">The Roast:</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown>{roast}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Small footer/credits */}
        <p className="mt-6 text-sm text-zinc-400">
          Built for flavortown!! The AI may not be 100% accurate regarding sites
        </p>

        <style jsx>{`
          /* Keyframes */
          @keyframes bounce-slow {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-8px);
            }
          }
          @keyframes hang {
            0% {
              transform: translateY(-2px) rotate(-6deg);
            }
            50% {
              transform: translateY(2px) rotate(6deg);
            }
            100% {
              transform: translateY(-2px) rotate(-6deg);
            }
          }
          @keyframes flame {
            0% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-3px) scale(1.06) rotate(-8deg);
            }
            100% {
              transform: translateY(0) scale(1);
            }
          }
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          @keyframes slide-in {
            0% {
              transform: translateY(18px) scale(0.98);
              opacity: 0;
            }
            100% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
          }
          @keyframes wobble {
            0% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(-8deg);
            }
            50% {
              transform: rotate(6deg);
            }
            75% {
              transform: rotate(-4deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }
          @keyframes confetti-fall {
            0% {
              transform: translateY(-10vh) rotate(0deg) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(120vh) rotate(360deg) scale(0.9);
              opacity: 0;
            }
          }
          @keyframes dot-blink {
            0% {
              opacity: 0.2;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0.2;
            }
          }

          /* Utility animation classes */
          .animate-bounce-slow {
            animation: bounce-slow 2.8s ease-in-out infinite;
          }
          .animate-hang {
            animation: hang 3.2s ease-in-out infinite;
          }
          .animate-flame {
            animation: flame 1s ease-in-out infinite;
          }
          .animate-spin-slow {
            animation: spin-slow 1.6s linear infinite;
          }
          .animate-slide-in {
            animation: slide-in 450ms cubic-bezier(0.2, 0.9, 0.2, 1);
          }
          .animate-wobble {
            animation: wobble 1600ms ease-in-out;
          }

          /* Dots on loading */
          .dots {
            display: inline-flex;
            width: 36px;
            justify-content: space-between;
            margin-left: 6px;
          }
          .dot {
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.95);
            animation: dot-blink 900ms infinite;
          }
          .dot:nth-child(2) {
            animation-delay: 200ms;
          }
          .dot:nth-child(3) {
            animation-delay: 400ms;
          }

          /* Confetti pieces */
          .confetti-piece {
            position: absolute;
            top: 0%;
            width: 10px;
            height: 14px;
            border-radius: 2px;
            opacity: 0;
            transform-origin: center;
            animation: confetti-fall 3.6s cubic-bezier(0.22, 0.62, 0.16, 1) forwards;
            z-index: 60;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
          }
          /* Staggering via inline animation-delay already set in style attribute */

          /* small responsive niceties */
          @media (max-width: 640px) {
            main {
              padding-top: 18px;
              padding-bottom: 18px;
            }
          }
        `}</style>
      </main>
    </div>
  );
}