import React from "react";
import { FacebookLayout } from "./FacebookLayout";
import type { NewsData } from "../../data/news";
import { newsMeta } from "../../data/newsMeta";

type FeedbackPopupProps = {
  show: boolean;
  title?: string;
  feedback?: string;
  onClose?: () => void;
  article?: NewsData;
};

const Feedback: React.FC<FeedbackPopupProps> = ({
  show,
  title,
  onClose,
  article,
}) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center size-full">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Card */}
      <div className="relative mx-3 w-max rounded-2xl overflow-hidden shadow-xl p-0 leading-none border border-black max-h-[calc(100vh-0.1rem)]">
        <div className="bg-linear-to-b from-[#4c0409] via-[#31130f] to-[#101011] px-6 text-white p-2 h-full">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl/6 font-extrabold">
              {title ?? "It's a Mismatch"}
            </h2>
            {article && (
              <div className="size-full rounded-md border border-white/30 shadow-md">
                <FacebookLayout
                  article={article}
                  hotspots={newsMeta[(article.id ?? 1) - 1]?.hotspots}
                />
              </div>
            )}

            <button
              className="mt-2 px-4 py-1 rounded-full bg-white text-red-900 font-semibold shadow transition hover:bg-red-900 hover:text-white cursor-pointer"
              onClick={onClose}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
