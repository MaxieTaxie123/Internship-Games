import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { FacebookLayout } from "./FacebookLayout";
import { newsData } from "../../data/news";
import type { NewsData } from "../../data/news";
import FeedbackPopup from "./Feedback";

type CardConfig = {
  component?: React.ComponentType<Record<string, never>>;
  className?: string;
  contentClassName?: string;
  data?: NewsData;
};

type CardsProps = {
  className?: string;
  cards?: CardConfig[];
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onFinished?: () => void; // called when stack empties and UI is deloaded
  onScoreChange?: (score: number) => void;
};

export type CardsHandle = {
  swipeLeft: () => void;
  swipeRight: () => void;
};

function OverlapCard({
  zIndex,
  config,
  style,
  isTop,
}: {
  zIndex: number;
  config: CardConfig;
  style?: React.CSSProperties;
  isTop?: boolean;
}) {
  const {
    component: Component = (() => <div />) as React.ComponentType<
      Record<string, never>
    >,
    className,
    contentClassName = "",
  } = config;

  return (
    <div
      className={`absolute rounded-xl shadow-xl flex ${className} ${
        isTop ? "touch-none" : "pointer-events-none"
      }`}
      style={{ zIndex, width: "min(92vw, 520px)", ...style }}
    >
      <div className={`w-full h-full mt-5 ${contentClassName}`}>
        <Component />
      </div>
    </div>
  );
}

const Cards = React.forwardRef<CardsHandle, CardsProps>(function Cards(
  { className = "", cards, onSwipeLeft, onSwipeRight, onFinished, onScoreChange }: CardsProps,
  ref
) {
  // Default to three empty configs if none provided
  const initial = (
    cards && cards.length
      ? cards
      : newsData.map((article) => {
          const companyName =
            article.companyName && article.companyName.trim()
              ? article.companyName
              : "Your Company";
          const replacePlaceholders = (s?: string) =>
            (s ?? "").replaceAll("[COMPANY_NAME]", companyName);

          const processed = {
            ...article,
            headline: replacePlaceholders(article.headline),
            description: replacePlaceholders(article.description),
          };

          return {
            className: "",
            contentClassName: "",
            // Create a component wrapper that binds the processed article prop
            component: () => <FacebookLayout article={processed} />,
            data: processed,
          };
        })
  ).slice();

  const [stack, setStack] = useState<CardConfig[]>(initial);
  const [score, setScore] = useState<number>(0);

  // Controls staged transition from cards -> summary

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Drag state for the top card
  const startX = useRef(0);
  const startTime = useRef(0);
  const dx = useRef(0);
  const dragging = useRef(false);
  const [dragStyle, setDragStyle] = useState<React.CSSProperties | undefined>(
    undefined
  );
  const [leftGlowOpacity, setLeftGlowOpacity] = useState(0);
  const [rightGlowOpacity, setRightGlowOpacity] = useState(0);
  const [pendingDirection, setPendingDirection] = useState<
    "left" | "right" | null
  >(null);

  const resetDrag = () => {
    dragging.current = false;
    dx.current = 0;
    setDragStyle(undefined);
    setLeftGlowOpacity(0);
    setRightGlowOpacity(0);
  };

  const removeTop = useCallback(
    (direction: "left" | "right") => {
      if (!stack.length) return;
      const top = stack[0];
      const isTrue = Boolean(top?.data?.isTrue);
      const playerThinksTrue = direction === "right"; // right = truth, left = fake
      const correct = playerThinksTrue === isTrue;

      if (!correct) {
        setFeedbackTitle("It's a Mismatch");
        setFeedbackMessage(
          `This post is ${isTrue ? "REAL" : "FAKE"}. ${
            isTrue
              ? "Next time, have a better look for the small details"
              : "Look below on what could give it away"
          }`
        );
        setShowFeedback(true);
        setPendingDirection(direction);
        // Animate out, but defer stack removal until feedback closes
        const translateWrong = direction === "left" ? "-60vw" : "60vw";
        const rotateWrong = direction === "left" ? -20 : 20;
        setDragStyle({
          transform: `translate(-50%, -50%) translateX(${translateWrong}) rotate(${rotateWrong}deg)`,
          transition: "transform 1000ms ease",
        });
        // no score change on incorrect
        return;
      }
      // correct classification: +1 score
      setScore((prev) => {
        const next = prev + 1;
        onScoreChange?.(next);
        return next;
      });
      const translate = direction === "left" ? "-60vw" : "60vw";
      const rotate = direction === "left" ? -20 : 20;
      setDragStyle({
        transform: `translate(-50%, -50%) translateX(${translate}) rotate(${rotate}deg)`,
        transition: "transform 1000ms ease",
      });

      setTimeout(() => {
        // If this was the last card, trigger feedback after removal
        const willBeEmpty = stack.length === 1;
        setStack((prev) => prev.slice(1));
        resetDrag();
        if (willBeEmpty) {
          setFeedbackTitle("All cards checked");
          setFeedbackMessage(
            "Nice work! You reviewed every post in this round."
          );
          setShowFeedback(true);
        }
        if (direction === "left") onSwipeLeft?.();
        else onSwipeRight?.();
      }, 300);
    },
      [stack, onSwipeLeft, onSwipeRight, onScoreChange]
  );

  const handleFeedbackClose = useCallback(() => {
    if (pendingDirection) {
      const direction = pendingDirection;
      const willBeEmpty = stack.length === 1;
      setStack((prev) => prev.slice(1));
      resetDrag();
      setPendingDirection(null);
      setShowFeedback(false);
      if (willBeEmpty) {
        setFeedbackTitle("All cards checked");
        setFeedbackMessage("Nice work! You reviewed every post in this round.");
        setShowFeedback(true);
      }
      if (direction === "left") onSwipeLeft?.();
      else onSwipeRight?.();
    } else {
      setShowFeedback(false);
    }
  }, [pendingDirection, stack.length, onSwipeLeft, onSwipeRight]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!stack.length) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    startTime.current = Date.now();
    dragging.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dx.current = e.clientX - startX.current;
    const angle = dx.current * 0.05;
    setDragStyle({
      transform: `translateX(${dx.current}px) rotate(${angle}deg)`,
    });

    const intensity = Math.min(Math.abs(dx.current) / 160, 1); // 0..1
    if (dx.current > 0) {
      setRightGlowOpacity(intensity);
      setLeftGlowOpacity(0);
    } else if (dx.current < 0) {
      setLeftGlowOpacity(intensity);
      setRightGlowOpacity(0);
    } else {
      setLeftGlowOpacity(0);
      setRightGlowOpacity(0);
    }
  };

  const handlePointerUp = () => {
    if (!dragging.current) return;
    const elapsed = Date.now() - startTime.current;
    const distance = dx.current;
    const fastSwipe = elapsed < 500 && Math.abs(distance) > 50;
    const farSwipe = Math.abs(distance) > 120;
    if (fastSwipe || farSwipe) {
      removeTop(distance < 0 ? "left" : "right");
    } else {
      // snap back
      setDragStyle({ transition: "transform 1000ms ease" });
      setTimeout(() => resetDrag(), 200);
    }
  };

  // Expose imperative swipe via ref
  useImperativeHandle(ref, () => ({
    swipeLeft: () => removeTop("left"),
    swipeRight: () => removeTop("right"),
  }));

  // When stack becomes empty, first unmount card UI, then inform parent
  React.useEffect(() => {
    if (stack.length === 0) {
      const id = window.setTimeout(() => onFinished?.(), 200);
      return () => clearTimeout(id);
    }
  }, [stack.length, onFinished]);

  return (
    <div
      className={`relative flex items-center justify-center size-full ${className} select-none`}
    >
      {/* Score badge */}
      <div className="absolute top-4 right-4 z-50 rounded-full border border-red-500/70 bg-black/60 px-4 py-1.5 text-[0.8rem] uppercase tracking-[0.2em] text-red-300 font-sharetech shadow">
        Score: {score}
      </div>
      {stack.length > 0 && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-screen w-24 m-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(239,68,68,0.55) 0%, rgba(239,68,68,0.0) 100%)",
              opacity: leftGlowOpacity,
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-screen w-24 m-0"
            style={{
              background:
                "linear-gradient(270deg, rgba(16,185,129,0.55) 0%, rgba(16,185,129,0.0) 100%)",
              opacity: rightGlowOpacity,
            }}
          />
          {stack.slice(0, 6).map((cfg, i) => {
            const isTop = i === 0;
            const z = 30 - i * 10; // top highest
            const style: React.CSSProperties = isTop
              ? dragStyle ?? {}
              : { transform: `scale(${1 - i * 0.03})` };

            const common = (
              <OverlapCard
                key={i}
                zIndex={z}
                config={cfg}
                style={style}
                isTop={isTop}
              />
            );

            if (!isTop) return common;
            return (
              <div
                key={i}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className="contents"
              >
                {common}
              </div>
            );
          })}
          <FeedbackPopup
            show={showFeedback && stack.length > 0}
            title={feedbackTitle}
            feedback={feedbackMessage}
            article={stack[0]?.data}
            onClose={handleFeedbackClose}
          />
        </>
      )}
    </div>
  );
});

export default Cards;
