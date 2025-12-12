import React, { useState } from "react";
import { imagePairs } from "../../data/pairs";
import { deepfakeMeta } from "../../data/deepfakeMeta";
import Circle from "./Circles";

type SummaryProps = {
  onBack?: () => void;
};

const Summary: React.FC<SummaryProps> = ({ onBack }) => {
  // Which image is focused in the overlay (pair + image index 0/1)
  const [focusedPairIndex, setFocusedPairIndex] = useState<number | null>(null);
  const [focusedImageIndex, setFocusedImageIndex] = useState<0 | 1 | null>(
    null
  );

  const showOverlay = focusedPairIndex !== null && focusedImageIndex !== null;

  const handleImageClick = (pairIndex: number, imageIndex: 0 | 1) => {
    setFocusedPairIndex(pairIndex);
    setFocusedImageIndex(imageIndex);
  };

  const closeOverlay = () => {
    setFocusedPairIndex(null);
    setFocusedImageIndex(null);
  };

  return (
    <section className="min-h-screen w-full flex items-start justify-center text-slate-50 px-4 py-8 select-none overflow-y-hidden fixed">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col gap-2">
            <div className="rounded-full bg-black/40 px-5 py-1 inline-flex">
              <p className="text-[0.55rem] tracking-[0.35em] uppercase text-red-400 font-sharetech">
                Phantom's Lab — Deepfake Detector
              </p>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-red-500 font-sharetech tracking-[0.25em] uppercase">
              {__`fakenews.summaryvisual`}
            </h1>
            <p className="text-xs md:text-sm text-slate-300 font-sharetech max-w-2xl">
              Below is an overview of all image pairs used in this training. For
              each pair, you can see which image was the deepfake and what
              visual clues give it away.
            </p>
          </div>
        </div>

        {/* Content list */}
        <div className="mt-2 space-y-6 overflow-y-auto max-h-[calc(100vh-9rem)] pr-2 rounded-2xl">
          {imagePairs.map((pair, index) => {
            const meta = deepfakeMeta[index];
            const fakeIndex = meta?.fakeIndex ?? 0;
            const reason =
              meta?.reason ||
              "No specific explanation provided for this pair yet.";

            const imageA = pair[0];
            const imageB = pair[1] ?? pair[0];

            return (
              <div
                key={index}
                className="bg-[#050610]/90 shadow-[0_0_20px_rgba(0,0,0,0.7)] p-4 md:p-5 space-y-4"
              >
                {/* Pair header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center rounded-full border border-red-500/70 bg-black/60 px-4 py-1.5 text-[1.5rem] uppercase tracking-[0.2em] text-red-300 font-sharetech mb-2">
                      {__`deepfake.pair`} {index + 1}
                    </span>
                  </div>
                </div>

                {/* Images row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  {/* Image A */}
                  <button
                    type="button"
                    onClick={() => handleImageClick(index, 0)}
                    className="relative h-[70vh] w-full rounded-2xl border border-slate-700/80 bg-slate-900/70 overflow-hidden group cursor-pointer"
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={imageA}
                        alt={`Pair ${index + 1} - Image A`}
                        className="w-full h-full object-cover block group-hover:scale-[1.02] transition-transform duration-300"
                      />
                      {fakeIndex === 0 && (
                        <div className="absolute right-3 top-3 rounded-full bg-red-500/80 px-3 py-0.5 shadow-[0_0_12px_rgba(248,113,113,0.8)]">
                          <span className="text-[0.6rem] uppercase tracking-[0.18em] font-sharetech text-black flex items-center">
                            Deepfake
                          </span>
                        </div>
                      )}

                      {/* Hotspot circles for deepfake A */}
                      {fakeIndex === 0 &&
                        meta?.hotspots?.map((spot, i) => (
                          <Circle
                            key={i}
                            size={spot.size || 28}
                            variant="outline"
                            className="absolute -translate-x-1/2 -translate-y-1/2 border-b-red-400"
                            style={{
                              left: `${spot.x}%`,
                              top: `${spot.y}%`,
                            }}
                          />
                        ))}
                    </div>
                  </button>

                  {/* Image B */}
                  <button
                    type="button"
                    onClick={() => handleImageClick(index, 1)}
                    className="relative h-[70vh] w-full rounded-2xl border border-slate-700/80 bg-slate-900/70 overflow-hidden group cursor-pointer"
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={imageB}
                        alt={`Pair ${index + 1} - Image B`}
                        className="w-full h-full object-cover block group-hover:scale-[1.02] transition-transform duration-300"
                      />
                      {fakeIndex === 1 && (
                        <div className="absolute right-3 top-3 rounded-full bg-red-500/80 px-3 py-0.5 shadow-[0_0_12px_rgba(248,113,113,0.8)]">
                          <span className="text-[0.6rem] uppercase tracking-[0.18em] font-sharetech text-black">
                            Deepfake
                          </span>
                        </div>
                      )}

                      {/* Hotspot circles for deepfake B */}
                      {fakeIndex === 1 &&
                        meta?.hotspots?.map((spot, i) => (
                          <Circle
                            key={i}
                            size={spot.size || 28}
                            variant="outline"
                            className="absolute -translate-x-1/2 -translate-y-1/2 border-b-red-400"
                            style={{
                              left: `${spot.x}%`,
                              top: `${spot.y}%`,
                            }}
                          />
                        ))}
                    </div>
                  </button>
                </div>

                {/* Explanation */}
                <div className="border-t border-slate-700/70 pt-3">
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

      {/* FOCUSED IMAGE OVERLAY (like feedback card in game) */}
      {showOverlay && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
          <div className="h-[70vh] w-[min(90vw,28rem)] rounded-3xl border border-red-900/80 bg-[#060712]/95 shadow-[0_0_40px_rgba(0,0,0,0.9)] overflow-hidden relative">
            {/* Close button */}
            <button
              type="button"
              onClick={closeOverlay}
              className="absolute right-3 top-3 z-50 rounded-full bg-black/70 px-2 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-slate-200 font-sharetech border border-red-500/70 hover:bg-red-500 hover:text-black transition"
            >
              {__`Close`}
            </button>

            <div className="relative w-full h-full">
              {(() => {
                const pair = imagePairs[focusedPairIndex!] || [];
                const dataIndex = focusedImageIndex as 0 | 1;
                const src = pair[dataIndex] || pair[0] || "";

                return (
                  <>
                    <img
                      className="w-full h-full object-cover block"
                      src={src}
                      alt={`Focused pair ${focusedPairIndex! + 1} image ${
                        dataIndex === 0 ? "A" : "B"
                      }`}
                    />
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="fixed bottom-2 right-2 p-2 my-2 rounded-full border border-red-500 text-[0.7rem] tracking-[0.25em] uppercase font-semibold font-sharetech
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
