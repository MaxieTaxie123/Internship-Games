import { AlertTriangle, Check, Reply, Forward } from "lucide-react";
import type { Email } from "../../../data/emails";
import { useEffect, useState, useRef } from "react";
import PhishTypeModal from "../PhishModal";
import { emailPhishKeyById, type PhishTypeKey } from "../../../data/phishTypes";

interface ReadingPaneProps {
  selected: Email;
  feedback: { correct: boolean; email: Email } | null;
  judge: (email: Email, isPhishing: boolean) => void;
  nextEmail: () => void;
  gameOver: boolean;
  score: number;
  onBonus?: (emailId: number) => void;
}

function initials(sender: string) {
  const base = sender.split("@")[0];
  const parts = base.replace(/\W+/g, " ").trim().split(" ");
  const first = parts[0]?.[0] ?? base[0] ?? "?";
  const second = parts[1]?.[0] ?? "";
  return (first + second).toUpperCase();
}

export default function ReadingPane({
  selected,
  feedback,
  judge,
  nextEmail,
  gameOver,
  score,
  onBonus,
}: ReadingPaneProps) {
  const [hasJudged, setHasJudged] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [isJudging, setIsJudging] = useState(false);
  // Track judged email ids so they cannot be re-graded when navigating
  const judgedIdsRef = useRef<Set<number>>(new Set());

  // Reset local UI state whenever the user switches to a different email
  useEffect(() => {
    // Set local UI state according to whether this email has been judged before
    setHasJudged(judgedIdsRef.current.has(selected.id));
    setShowTypeModal(false);
    setIsJudging(false);
  }, [selected.id]);

  // Handle legit emails
  function handleLegit() {
    if (isJudging || judgedIdsRef.current.has(selected.id)) return;
    setIsJudging(true);
    judge(selected, false);
    judgedIdsRef.current.add(selected.id);
    setHasJudged(true);
    setIsJudging(false);
  }

  // Open phishing type picker
  function handlePhish() {
    if (isJudging || judgedIdsRef.current.has(selected.id)) return;
    setShowTypeModal(true);
  }

  // Submit phishing subtype
  function submitType(picked: PhishTypeKey) {
    setShowTypeModal(false);
    if (isJudging || judgedIdsRef.current.has(selected.id)) return;

    setIsJudging(true);
    judge(selected, true);
    judgedIdsRef.current.add(selected.id);
    setHasJudged(true);

    const truth = emailPhishKeyById[selected.id] ?? [];
    if (onBonus && truth.includes(picked)) {
      onBonus(selected.id);
    }
    setIsJudging(false);
  }

  if (gameOver) {
    return (
      <section className="overflow-auto h-full flex flex-col items-center justify-center gap-3">
        <div className="text-3xl font-bold">Game over!</div>
        <div className="text-lg">
          Score: <span className="font-semibold">{score}</span>
        </div>
        <button
          className="mt-2 rounded-lg bg-violet-600 hover:bg-violet-500 px-4 py-2"
          onClick={() => location.reload()}
        >
          Play Again
        </button>
      </section>
    );
  }

  return (
    <section className="overflow-auto p-6">
      <div className="bg-[#1e1e1e] border border-[#3a3a3a] rounded-lg shadow-md p-0 max-w-5xl mx-auto">
        {/* Top bar */}
        <div className="bg-[#2c2c2c] border-b border-[#3a3a3a] px-5 py-3 rounded-t-lg flex items-center justify-between">
          <div className="text-white font-semibold text-lg truncate">{selected.subject}</div>
          <div className="text-xs text-zinc-400 whitespace-nowrap">
            {selected.date.toLocaleString("en-GB", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        {/* Sender info */}
        <div className="px-5 py-4 border-b border-[#3a3a3a] text-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-semibold text-white">
            {selected.icon || initials(selected.sender)}
          </div>
          <div className="flex flex-col">
            <div className="text-white font-medium">{selected.sender}</div>
            <div className="text-zinc-400">To: <span className="text-emerald-400">user.email</span></div>
          </div>
        </div>

        {/* Email content */}
        <div className="px-5 py-6 text-zinc-200 leading-relaxed whitespace-pre-wrap bg-[#1e1e1e]">
          {selected.body}
        </div>

        {/* Feedback */}
        {feedback && feedback.email.id === selected.id && (
          <div
            className={`mt-4 mx-5 rounded-md px-4 py-3 border text-sm ${
              feedback.correct
                ? "bg-emerald-600/10 border-emerald-500/30 text-emerald-400"
                : "bg-red-600/10 border-red-500/30 text-red-400"
            }`}
          >
            {feedback.correct
              ? "✅ Correct! You identified the email correctly."
              : "⚠️ Not quite right — watch out for suspicious links, tone, or sender addresses."}
          </div>
        )}

        {/* Buttons */}
        <div className="px-5 py-4 border-t border-[#3a3a3a] bg-[#252525] flex justify-end gap-3 rounded-b-lg">
          {!hasJudged ? (
            <>
              <button
                disabled={isJudging}
                onClick={handlePhish}
                className={`flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm transition
                  ${isJudging ? "opacity-50 cursor-not-allowed" :
                  "bg-red-700/30 hover:bg-red-700/40 border-red-600/50 text-red-300"}`}
              >
                <AlertTriangle className="w-4 h-4" /> Mark as Phishing
              </button>
              <button
                disabled={isJudging}
                onClick={handleLegit}
                className={`flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm transition
                  ${isJudging ? "opacity-50 cursor-not-allowed" :
                  "bg-emerald-700/30 hover:bg-emerald-700/40 border-emerald-600/50 text-emerald-300"}`}
              >
                <Check className="w-4 h-4" /> Mark as Legit
              </button>
            </>
          ) : (
              <button
              onClick={() => {
                // Advance to next; judged state is preserved in judgedIdsRef
                nextEmail();
                setShowTypeModal(false);
              }}
              className="rounded-md bg-violet-600 hover:bg-violet-500 px-4 py-2 text-sm font-medium text-white"
            >
              Next Email →
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 flex gap-3 bg-[#1e1e1e] border-t border-[#3a3a3a]">
          <button className="flex items-center gap-2 bg-[#2d2d2d] hover:bg-[#3a3a3a] border border-[#3f3f3f] rounded-md px-3 py-1.5 text-sm text-zinc-200">
            <Reply className="w-4 h-4" /> Reply
          </button>
          <button className="flex items-center gap-2 bg-[#2d2d2d] hover:bg-[#3a3a3a] border border-[#3f3f3f] rounded-md px-3 py-1.5 text-sm text-zinc-200">
            <Forward className="w-4 h-4" /> Forward
          </button>
        </div>
      </div>

      {/* Phishing Type Modal */}
      <PhishTypeModal
        open={showTypeModal}
        onClose={() => setShowTypeModal(false)}
        onSubmit={submitType}
        title="Which type of phishing is this?"
      />
    </section>
  );
}
