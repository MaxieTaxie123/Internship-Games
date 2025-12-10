import { AlertTriangle, Check, X } from "lucide-react";
import type { Email } from "../../../data/emails";
import { useEffect, useState, useRef } from "react";
import PhishTypeModal from "../PhishModal";
import { emailPhishKeyById, type PhishTypeKey } from "../../../data/phishTypes";

interface GmailReadingPaneProps {
  selected: Email;
  feedback: { correct: boolean; email: Email } | null;
  judge: (email: Email, isPhishing: boolean) => void;
  nextEmail: () => void;
  close: () => void;
  gameOver: boolean;
  score: number;
  onBonus?: (emailId: number) => void;
}

export default function GmailReadingPane({
  selected,
  feedback,
  judge,
  nextEmail,
  close,
  gameOver,
  score,
  onBonus,
}: GmailReadingPaneProps) {
  const [hasJudged, setHasJudged] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  // Track judged email ids so they cannot be re-graded when navigating
  const judgedIdsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    // synchronize local UI state when selected email changes
    setHasJudged(judgedIdsRef.current.has(selected.id));
    setShowTypeModal(false);
  }, [selected.id]);

  if (gameOver) {
    return (
      <section className="overflow-auto h-full flex flex-col items-center justify-center gap-3 bg-gray-800/70">
        <div className="text-3xl font-bold">Game over!</div>
        <div className="text-lg">
          Score: <span className="font-semibold">{score}</span>
        </div>
        <button
          className="mt-2 rounded-lg bg-violet-600 hover:bg-violet-500 px-4 py-2 cursor-pointer"
          onClick={() => location.reload()}
        >
          Play Again
        </button>
      </section>
    );
  }

  function handleLegit() {
    if (judgedIdsRef.current.has(selected.id)) return;
    judge(selected, false);
    judgedIdsRef.current.add(selected.id);
    setHasJudged(true);
  }

  function handlePhish() {
    if (judgedIdsRef.current.has(selected.id)) return;
    setShowTypeModal(true);
  }

  function submitType(picked: PhishTypeKey) {
    setShowTypeModal(false);
    if (judgedIdsRef.current.has(selected.id)) return;

    judge(selected, true);
    judgedIdsRef.current.add(selected.id);
    setHasJudged(true);

    const truth = emailPhishKeyById[selected.id] ?? [];
    if (onBonus && truth.includes(picked)) onBonus(selected.id);
  }

  return (
    <div className="flex flex-col h-full bg-[#202124]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#2c2c2c] bg-[#202124] rounded-t-lg">
        <div>
          <div className="font-semibold text-lg">{selected.subject}</div>
          <div className="text-xs text-[#9aa0a6] mt-1">{selected.sender}</div>
        </div>
        <button onClick={close} className="text-[#9aa0a6] hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 p-6 overflow-auto text-sm text-[#e8eaed] leading-relaxed">
        {selected.body}
      </div>

      {/* Feedback */}
      {feedback && feedback.email.id === selected.id && (
        <div
          className={`flex mx-6 mb-4 px-4 py-3 rounded-md text-sm border ${
            feedback.correct
              ? "bg-green-900/20 border-green-700 text-green-300"
              : "bg-red-900/20 border-red-700 text-red-300"
          }`}
        >
          {feedback.correct
            ? <span className="text-white flex items-center w-full gap-2"><Check className="text-green-500" /> Correct! You identified the email correctly.</span>
            : <span className="text-white flex items-center w-full gap-2"><X className="text-red-500" />Incorrect — beware of fake senders or urgency.</span>}
        </div>
      )}

      {/* Buttons */}
      <div className="px-6 py-3 border-t border-[#2c2c2c] flex justify-end gap-3 bg-[#1f1f1f] rounded-b-lg">
        {!hasJudged ? (
          <>
            <button
              onClick={handlePhish}
              className="flex items-center gap-2 border border-red-700 text-red-400 px-3 py-1.5 rounded-md hover:bg-red-900/30"
            >
              <AlertTriangle className="w-4 h-4" /> Mark as Phishing
            </button>
            <button
              onClick={handleLegit}
              className="flex items-center gap-2 border border-green-700 text-green-400 px-3 py-1.5 rounded-md hover:bg-green-900/30"
            >
              <Check className="w-4 h-4" /> Mark as Legit
            </button>
          </>
          ) : (
          <button
            onClick={() => {
              // Advance to next; judged state is preserved in judgedIdsRef
              nextEmail();
            }}
            className="bg-[#8ab4f8] text-[#202124] px-4 py-2 rounded-md font-medium"
          >
            Next Email →
          </button>
        )}
      </div>

      {/* Phishing Type Modal */}
      <PhishTypeModal
        open={showTypeModal}
        onClose={() => setShowTypeModal(false)}
        onSubmit={submitType}
        title="Which type of phishing is this?"
      />
    </div>
  );
}
