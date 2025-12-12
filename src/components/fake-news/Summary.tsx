import React from "react";
import { newsMeta } from "../../data/newsMeta";
import { newsData } from "../../data/news";
import { FacebookLayout } from "./FacebookLayout";

type SummaryProps = {
  onBack?: () => void;
};

const Summary: React.FC<SummaryProps> = ({ onBack }) => {
  return (
    <section
      className="w-full flex items-start justify-center text-slate-50 p-4 select-none"
    >
      <div className="fixed w-full max-w-6xl flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col gap-2">
            <div className="rounded-full bg-black/40 px-5 py-1 inline-flex">
              <p className="text-[0.55rem] tracking-[0.35em] uppercase text-red-400 font-sharetech">
                Phantom's Lab — Truth Finder
              </p>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-red-500 font-sharetech tracking-[0.25em] uppercase">
              Summary & Visual Clues
            </h1>
            <p className="text-sm md:text-base text-slate-300 font-sharetech max-w-3xl">
              Overview of all articles reviewed. Each card shows the post with
              comments and the key visual clues highlighted.
            </p>
          </div>
        </div>

        {/* Content list */}
        <div className="my-2 space-y-6 overflow-y-scroll max-h-[calc(100vh-10rem)] pr-2 py-4 rounded-2xl">
          {newsData.map((item, index) => {
            const meta = newsMeta[index];
            const reason =
              meta?.reason ||
              "Article is true and contains no misleading information.";
            const companyName =
              item.companyName && item.companyName.trim()
                ? item.companyName
                : "Your Company";
            const replacePlaceholders = (s?: string) =>
              (s ?? "").replaceAll("[COMPANY_NAME]", companyName);
            const processed = {
              ...item,
              headline: replacePlaceholders(item.headline),
              description: replacePlaceholders(item.description),
            };

            return (
              <div
                key={index}
                className="bg-[#050610]/90 shadow-[0_0_20px_rgba(0,0,0,0.7)] space-y-1 border-t border-slate-700/70 pt-5 h-max"
              >
                {/* Article header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center rounded-full border border-red-500/70 bg-black/60 px-4 py-1.5 text-[1.5rem] uppercase tracking-[0.2em] text-red-300 font-sharetech mb-2">
                      Article {index + 1}
                    </span>
                  </div>
                </div>

                {/* Centered Facebook-style card with hotspots */}
                <div className="w-full flex items-center justify-center">
                  <FacebookLayout
                    article={processed}
                    hotspots={meta?.hotspots}
                  />
                </div>

                {/* Explanation */}
                <div className="pt-3">
                  <p className="text-[0.6rem] uppercase tracking-[0.25em] text-red-400 font-sharetech mb-1">
                    Why this is a deepfake
                  </p>
                  <p className="text-xs md:text-sm text-slate-200 font-sharetech leading-relaxed mb-5">
                    {reason}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="absolute bottom-2 right-2 p-2 my-2 rounded-full border border-red-500 text-[0.7rem] tracking-[0.25em] uppercase font-semibold font-sharetech
                         bg-black/40 text-red-300 hover:bg-red-500/10 hover:text-red-100
                         hover:shadow-[0_0_25px_rgba(248,113,113,0.7)] transition"
        >
          {__`Back to Explanation`}
        </button>
      )}
    </section>
  );
};

export default Summary;
