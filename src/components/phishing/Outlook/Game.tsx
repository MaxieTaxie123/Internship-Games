import { useMemo, useState } from "react";
import { emails as rawEmails } from "../../../data/emails";
import type { Email } from "../../../data/emails";
import Header from "./Header";
import Toolbar from "./Toolbar";
import Sidebar from "./SideBar";
import EmailList from "./EmailList";
import ReadingPane from "./ReadingPane";
import PhoneCallManager from "../PhoneCallManager";

// Shuffle emails in random order at start
const sortedEmails: Email[] = [...rawEmails].sort(() => Math.random() - 0.5);

export default function OutlookGame() {
  const [judgedCorrect, setJudgedCorrect] = useState<Record<number, boolean | undefined>>({});
  const [selectedId, setSelectedId] = useState<number | null>(sortedEmails[0]?.id ?? null);
  const [feedback, setFeedback] = useState<{ correct: boolean; email: Email } | null>(null);

  // Derived state
  const score = useMemo(
    () => Object.values(judgedCorrect).filter((v) => v === true).length,
    [judgedCorrect]
  );

  const total = sortedEmails.length;
  const doneCount = Object.values(judgedCorrect).filter((v) => v !== undefined).length;
  const progressPct = Math.round((doneCount / total) * 100);

  const selected = sortedEmails.find((e) => e.id === selectedId) ?? sortedEmails[0];

  function getNextUnjudged() {
    return sortedEmails.find((e) => judgedCorrect[e.id] === undefined);
  }

  function judge(email: Email, sayPhishing: boolean) {
    const correct = email.isPhishing === sayPhishing;
    setJudgedCorrect((j) => ({ ...j, [email.id]: correct }));
    setFeedback({ correct, email });

    const next = getNextUnjudged();
    if (next) setSelectedId(next.id);
  }

  // Handle incoming call decisions from PhoneCallManager
  function handleCallDecision(correct: boolean) {
    if (correct) {
      // reward only if player is still active
      setJudgedCorrect((prev) => ({ ...prev, [`call_${Date.now()}`]: true }));
    }
  }

  function handleBonus(emailId: number) {
    // add a synthetic “bonus_*” success so the score goes up by +1
    setJudgedCorrect((prev) => ({ ...prev, [`bonus_${emailId}`]: true }));
  }

  const gameOver = doneCount === total;

  return (
    <div className="h-screen w-full bg-zinc-900 text-zinc-100 grid grid-rows-[56px_1fr] gap-0 overflow-hidden">
      {/* Top UI */}
      <Header />
      <Toolbar />

      {/* Main layout */}
      <div className="grid grid-cols-[260px_360px_1fr] h-full min-h-0 gap-1">
        <Sidebar
          doneCount={doneCount}
          progressPct={progressPct}
          score={score}
        />

        <EmailList
          emails={sortedEmails}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onJudge={judge}
          judgedCorrect={judgedCorrect}
        />

        <ReadingPane
          selected={selected}
          feedback={feedback}
          judge={judge}
          nextEmail={() => {
            const next = getNextUnjudged();
            if (next) setSelectedId(next.id);
          }}
          gameOver={gameOver}
          score={score}
          onBonus={handleBonus}
        />
      </div>

      {/* Random phone events (only active if game not finished) */}
      <PhoneCallManager onDecision={handleCallDecision} gameOver={gameOver} />
    </div>
  );
}
