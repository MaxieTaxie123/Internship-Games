import VerticalProgress from "./ProgressBar";
import React, { useEffect, useRef, useState, useCallback } from "react";
import FeedbackPopup from "./FeedbackPopup";
import StreakTimer from "./StreakTimer";
import Circle from "./Circles";
import { imagePairs } from "../../data/pairs";
import { deepfakeMeta } from "../../data/deepfakeMeta";

const ANIMATION_DURATION = 2000; // ms
const FLIP_TO_BACK_FRACTION = 0.25; // when cards are fully back-side up

// Timer tuning
const BASE_TIME = 30000; // 30s at streak 0
const MIN_TIME = 5000; // min 5s
const STREAK_STEP = 3000; // -3s per correct in a row

const getRoundDuration = (streak: number) =>
  Math.max(MIN_TIME, BASE_TIME - streak * STREAK_STEP);

// helper to randomize left/right layout
const randomLayout = (): [0, 1] | [1, 0] =>
  Math.random() < 0.5 ? [0, 1] : [1, 0];

type ContainerProps = {
  onFinished?: () => void;
};

const Test: React.FC<ContainerProps> = ({ onFinished }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<(HTMLDivElement | null)[]>([]);
  const [pairIndex, setPairIndex] = useState(0);

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number>(getRoundDuration(0));

  // which card did the user click? 0/1 or null (display index)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // mapping from display index -> data index in imagePairs[pairIndex]
  // e.g. [0,1] = fake left, [1,0] = fake right
  const [layout, setLayout] = useState<[0, 1] | [1, 0]>(() => randomLayout());

  const handleFlip = () => {
    const container = containerRef.current;
    if (!container) return;

    // Run flip animation on both cards
    boxRef.current.forEach((item) => {
      if (!item) return;

      item.animate(
        [
          {
            transform: "translate3d(0,0,0) rotateY(0deg)",
            offset: 0,
          },
          {
            transform: "translate3d(0,0,0) rotateY(180deg)",
            offset: 0.25,
          },
          {
            transform: "translate3d(0,0,0) rotateY(180deg)",
            offset: 0.75,
          },
          {
            transform: "translate3d(0,0,0) rotateY(360deg)",
            offset: 1,
          },
        ],
        {
          duration: ANIMATION_DURATION,
        }
      );
    });

    // After cards are flipped to the back (at 25% of animation),
    // update to the next image pair.
    const flipToBackTime = ANIMATION_DURATION * FLIP_TO_BACK_FRACTION;
    window.setTimeout(() => {
      const next = pairIndex + 1;
      if (next >= imagePairs.length) {
        // end of rounds
        setShowFeedback(false);
        setSelectedIndex(null);
        if (onFinished) onFinished();
        return;
      }

      setPairIndex(next);
      setShowFeedback(false); // hide any old feedback for the new pair
      setSelectedIndex(null); // reset selection
      setLayout(randomLayout()); // randomize fake left/right for next pair
    }, flipToBackTime);

    setShowFeedback(false);
  };

  const handleTimeout = useCallback(() => {
    if (showFeedback) return; // already showing something
    setFeedbackTitle("Time's up!");
    setFeedbackMessage(
      "You ran out of time on this pair. Use the explanation to learn what to look for in deepfakes."
    );
    setShowFeedback(true);
    setStreak(0); // reset streak on timeout
  }, [showFeedback]);

  const handleCardClick = (displayIndex: number) => {
    if (showFeedback) return; // ignore clicks when feedback is open
    const meta = deepfakeMeta[pairIndex];

    // If there's no meta for this pair, just show a generic message
    if (!meta) {
      setFeedbackTitle("Deepfake clue");
      setFeedbackMessage(
        "Look closely at skin texture, lighting, and edges of the face and hair. Small inconsistencies often reveal a deepfake."
      );
      setShowFeedback(true);
      window.setTimeout(() => setShowFeedback(false), 6000);
      return;
    }

    // meta.fakeIndex is the data index (usually 0)
    // find which display index currently shows that data index
    const fakeDisplayIndex = layout.findIndex(
      (dataIdx) => dataIdx === meta.fakeIndex
    );

    const isDeepfake = displayIndex === fakeDisplayIndex;

    // remember which card was chosen (display index)
    setSelectedIndex(displayIndex);

    // update streak based on correctness
    setStreak((prev) => (isDeepfake ? prev + 1 : 0));

    setFeedbackTitle(
      isDeepfake
        ? "Correct – this one is the deepfake."
        : "This one is likely real."
    );

    setFeedbackMessage(
      isDeepfake
        ? meta.reason
        : `Compare this with the other image: ${meta.reason}`
    );

    setShowFeedback(true);
  };

  useEffect(() => {
    if (!imagePairs.length) return;

    // If feedback is open, don't start/reset the timer yet
    if (showFeedback) return;

    const roundDuration = getRoundDuration(streak);
    window.setTimeout(() => setTimeLeft(roundDuration), 0);

    const endTime = Date.now() + roundDuration;

    const id = window.setInterval(() => {
      const remaining = endTime - Date.now();
      if (remaining <= 0) {
        clearInterval(id);
        setTimeLeft(0);
        handleTimeout();
      } else {
        setTimeLeft(remaining);
      }
    }, 100);

    return () => {
      clearInterval(id);
    };
  }, [pairIndex, streak, showFeedback, handleTimeout]);

  const secondsLeft = Math.ceil(timeLeft / 1000);
  const totalPairs = imagePairs.length;
  const currentPairNumber = pairIndex + 1;

  const currentMeta = deepfakeMeta[pairIndex];

  // --- compute which card (display index) is the "wrong" one ----------
  let wrongCardIndex: number | null = null;
  if (selectedIndex !== null && currentMeta) {
    const fakeDisplayIndex = layout.findIndex(
      (dataIdx) => dataIdx === currentMeta.fakeIndex
    );

    wrongCardIndex = fakeDisplayIndex;
  }
  // --------------------------------------------------------------------

  return (
    <>
      <section className="min-h-screen w-full overflow-x-hidden text-slate-50 relative select-none overflow-hidden">
        <div className="h-screen w-auto flex items-center justify-center p-4">
          <div
            ref={containerRef}
            className="grid grid-cols-5 grid-rows-5 gap-4 place-items-center place-content-center text-center w-full h-full"
          >
            <div className="fixed col-span-3 col-start-2 row-start-1 row-span-2 h-max w-max top-1">
              {/* Top label + title block */}
              <div className="flex flex-col items-center gap-4 p-5">
                <h2 className="px-6 py-2 rounded-full border border-red-500 tracking-[0.25em] uppercase font-bold bg-black/20 text-red-500 shadow-[0_0_25px_rgba(0,0,0,0.6)] font-sharetech">
                  {__`deepfake.title`}
                </h2>

                <p className="text-xs md:text-sm text-slate-300 max-w-xl text-center tracking-[0.12em] uppercase font-sharetech">
                  {__`deepfake.title.description`}
                </p>
                <StreakTimer secondsLeft={secondsLeft} streak={streak} />
              </div>
            </div>
            {([0, 1] as const).map((displayIndex) => {
              const pair = imagePairs[pairIndex] || [];
              const dataIndex = layout[displayIndex];
              const src = pair[dataIndex] || pair[0] || "";

              // Grid placement: displayIndex 0 at former "2" slot, displayIndex 1 at former "3" slot
              const placement =
                displayIndex === 0
                  ? "col-span-2 row-span-3 col-start-2 row-start-3 -translate-1/4 "
                  : "col-span-2 row-span-3 col-start-4 row-start-3 -translate-1/4 ";

              return (
                <div key={displayIndex} className={`${placement} size-full`}>
                  <div className="group h-[70vh] w-full mx-auto perspective-[1000px] flex items-center justify-center">
                    <div
                      ref={(el) => {
                        boxRef.current[displayIndex] = el;
                      }}
                      className="flip-card-inner rounded-3xl w-full h-full border border-red-900/60 bg-[#060712]/90 transition-shadow duration-300"
                    >
                      {/* FRONT */}
                      <div className="flip-card-front relative flex items-center bg-center justify-center rounded-3xl overflow-hidden size-full">
                        <button
                          type="button"
                          onClick={() => handleCardClick(displayIndex)}
                          disabled={showFeedback}
                          className={`relative w-full h-full overflow-hidden cursor-pointer transition-transform duration-300 ${
                            showFeedback
                              ? "cursor-not-allowed opacity-60"
                              : "group-hover:scale-[1.02]"
                          }`}
                        >
                          <div className="relative w-full h-full overflow-hidden">
                            <img
                              className="w-full h-full object-cover block size-[90%]"
                              src={src}
                              alt={`Card ${displayIndex + 1}`}
                            />
                          </div>
                        </button>
                      </div>

                      {/* BACK */}
                      <div
                        className="flip-card-back flex items-center justify-center rounded-3xl border bg-black border-red-500 text-3xl font-bold text-red-400"
                        style={{
                          backgroundImage:
                            "radial-gradient(1200px 600px at 20% -10%, rgba(227,6,19,0.25), transparent 60%), radial-gradient(800px 500px at 90% 110%, rgba(227,6,19,0.18), transparent 55%)",
                        }}
                      >
                        <img
                          className="flex scale-105 justify-center items-center"
                          src="./deepfake/logo-icon.png"
                          alt="Deepfake Detector"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="fixed left-0 text-white flex items-center justify-center w-40 rounded-r-md shadow h-full">
              {/* Vertical progress bar on the left */}
              <VerticalProgress
                current={currentPairNumber}
                total={totalPairs}
              />
            </div>
          </div>
        </div>

        {/* DUPLICATE WRONG CARD OVERLAY */}
        {showFeedback && wrongCardIndex !== null && (
          <div className="fixed inset-0 z-30 flex items-start justify-center pt-5 pointer-events-none aspect-square">
            <div className="h-[70vh] w-max rounded-3xl border border-red-900/80 bg-[#060712]/95 shadow-[0_0_40px_rgba(0,0,0,0.9)] overflow-hidden">
              <div className="relative w-full h-full">
                {(() => {
                  const pair = imagePairs[pairIndex] || [];
                  const dataIndex = layout[wrongCardIndex];
                  const src = pair[dataIndex] || pair[0] || "";
                  const meta = deepfakeMeta[pairIndex];
                  const isFakeWrong = meta && dataIndex === meta.fakeIndex;

                  return (
                    <>
                      <img
                        className="w-full h-full object-cover block"
                        src={src}
                        alt={`Focused card ${wrongCardIndex + 1}`}
                      />
                      {isFakeWrong &&
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
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM POP-UP FEEDBACK */}
        <FeedbackPopup
          show={showFeedback}
          title={feedbackTitle}
          message={feedbackMessage}
          onClose={() => setShowFeedback(false)}
          onNext={handleFlip}
        />
      </section>
    </>
  );
};

export default Test;
