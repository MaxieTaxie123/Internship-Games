import { useMemo, useState } from "react";
import { Ellipsis, Heart, MessageCircle, Share2, TextAlignJustify, ThumbsUp } from "lucide-react";
import type { NewsData } from "../../data/news";
import type { NewsHotspot } from "../../data/newsMeta";
import Hotspot from "./Hotspot";

// Deterministic pseudo-random number based on a string seed
function seededNumber(seed: string, min: number, max: number) {
  let hash = 5381;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 33) ^ seed.charCodeAt(i);
  }
  const positive = Math.abs(hash);
  const range = max - min + 1;
  return (positive % range) + min;
}

export function FacebookLayout({ article, maxDescriptionLength = 210, compact = false, hotspots }: { article: NewsData; maxDescriptionLength?: number; compact?: boolean; hotspots?: NewsHotspot[] }) {
  const [liked, setLiked] = useState(false);
  const commentsCount = useMemo(() => {
    const seed = `${article.headline ?? ""}|${article.authorCompany ?? ""}|${article.description ?? ""}`;
    return seededNumber(seed, 1, 10);
  }, [article.headline, article.authorCompany, article.description]);
  const dateTime = new Date();
  const truncatedDescription = useMemo(() => {
    const maxLen = maxDescriptionLength;
    const text = (article.description ?? "").trim();
    if (text.length <= maxLen) return text;
    const slice = text.slice(0, maxLen);
    const lastSpace = slice.lastIndexOf(" ");
    const base = lastSpace > 0 ? slice.slice(0, lastSpace) : slice;
    return base + "…";
  }, [article.description, maxDescriptionLength]);

  return (
    <div className="size-full flex items-center justify-center">
      <div className="md:w-[480px] h-full bg-white rounded-md shadow-xl overflow-hidden relative">
        {/* Top bar */}
        <div className="h-12 bg-[#3b5998] text-white flex items-center justify-between px-1">
          <div className="flex items-center">
            <img src="./fake-news/Facebook.png" alt="Facebook" className="w-full h-12" />
          </div>
          <div className="flex items-center px-2">
            <TextAlignJustify />
          </div>
        </div>

        {/* Post header */}
        <div className="px-4 py-3 bg-white">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full">
              <img className="w-full h-full object-cover rounded-full border-gray-300 border" src={article.authorImage} alt="source" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{article.authorCompany}</p>
              <p className="text-xs text-gray-500">{dateTime.toLocaleDateString()}</p>
            </div>
            <div className="w-6 h-6 rounded-full text-gray-400">
              <Ellipsis />
            </div>
          </div>
        </div>

        {/* Content area */}
        <div
          className={`bg-[#3b5998] flex-1 ${compact ? "min-h-60 p-3" : "min-h-90 p-4"} flex h-max flex-col justify-end bg-cover bg-center bg-no-repeat border-y border-gray-100`}
          style={article.articleImage ? { backgroundImage: `url(${article.articleImage})` } : undefined}
        >
          <h3 className={`text-white font-bold ${compact ? "text-2xl" : "text-3xl"} headline-stroke`}>
            {article.headline}
          </h3>
        </div>

        {/* Footer actions */}
        <div className="bg-white">
          <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-600">
            <div className="flex items-center space-x-0.5">
              <div className="w-full h-full p-1 bg-red-500 text-white fill-white rounded-full">
                <Heart size={12} fill="currentColor" />
              </div>
              <div className="w-full h-full p-1 bg-blue-500 text-white fill-white rounded-full">
                <ThumbsUp size={12} fill="currentColor" />
              </div>
              <div className="w-full h-full bg-yellow-500 text-white fill-white rounded-full">&#128558;</div>
            </div>
            <span>{commentsCount} Comments</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed px-3 overflow-hidden text-left" title={article.description}>
            <span className="font-semibold text-justify">{article.authorCompany}</span> - {truncatedDescription}
          </p>
          <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-around text-gray-600">
            <div className="flex items-center space-x-2 cursor-pointer">
              <button type="button" onClick={() => setLiked((v) => !v)} className={liked ? "text-blue-500" : "text-gray-400"} aria-pressed={liked} aria-label="Like">
                <ThumbsUp fill={liked ? "currentColor" : "none"} />
              </button>
              <span>Like</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="text-gray-400">
                <MessageCircle />
              </div>
              <span>Comment</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="text-gray-400">
                <Share2 />
              </div>
              <span>Share</span>
            </div>
          </div>
        </div>
        {/* Hotspots overlay spanning the entire card area (0,0 at top-left of card) */}
        {hotspots && hotspots.length > 0 && (
          <div className="absolute inset-0 z-10">
            {hotspots.map((h, idx) => (
              <Hotspot key={idx} hotspot={h} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
