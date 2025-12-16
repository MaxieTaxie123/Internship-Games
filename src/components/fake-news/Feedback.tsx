import React from "react";
import { FacebookLayout } from "./FacebookLayout";
import type { NewsData } from "../../data/news";
import { newsMeta } from "../../data/newsMeta";
import { X } from "lucide-react";

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
            <div className="relative w-full">
              <h2 className="text-2xl/6 font-extrabold text-center">
                {title ?? __`fakenews.mismatched`}
              </h2>
              <button
                className="absolute right-0 top-1/2 -translate-y-3/5 p-1 rounded-full text-white font-semibold shadow transition hover:text-gray-400 cursor-pointer"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {article && (
              <div className="size-full rounded-md border border-white/30 shadow-md">
                <FacebookLayout
                  article={article}
                  hotspots={newsMeta[(article.id ?? 1) - 1]?.hotspots}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
