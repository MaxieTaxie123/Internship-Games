import { useMemo, useState } from "react";
import { emails as rawEmails } from "../../../data/emails";
import type { Email } from "../../../data/emails";
import GmailHeader from "./Header";
import Sidebar from "./Sidebar";
import GmailEmailList from "./EmailList";
import GmailReadingPane from "./ReadingPane";
import PhoneCallManager from "../PhoneCallManager";

const shuffledEmails = [...rawEmails].sort(() => Math.random() - 0.5);

export default function GmailGame() {
  const [judged, setJudged] = useState<Record<number, boolean | undefined>>({});
  const [openEmail, setOpenEmail] = useState<Email | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; email: Email } | null>(null);

  const score = useMemo(() => Object.values(judged).filter((v) => v === true).length, [judged]);
  const total = shuffledEmails.length;
  const doneCount = Object.values(judged).filter((v) => v !== undefined).length;
  const progressPct = Math.round((doneCount / total) * 100);

  function judge(email: Email, isPhishing: boolean) {
    const correct = email.isPhishing === isPhishing;
    setJudged((prev) => ({ ...prev, [email.id]: correct }));
    setFeedback({ correct, email });
  }

  function nextEmail() {
    const next = shuffledEmails.find((e) => judged[e.id] === undefined);
    setOpenEmail(next ?? null);
  }

  // Handle incoming call decisions from PhoneCallManager
  function handleCallDecision(correct: boolean) {
    if (correct) {
      // reward only if player is still active
      setJudged((prev) => ({ ...prev, [`call_${Date.now()}`]: true }));
    } else {
      console.warn("Wrong call decision — no score awarded");
    }
  }

  function handleBonus(emailId: number) {
    // add a synthetic “bonus_*” success so the score goes up by +1
    setJudged((prev) => ({ ...prev, [`bonus_${emailId}`]: true }));
  }

  const gameOver = doneCount === total;

  return (
    <div className="h-screen flex flex-col gap-0 text-white bg-[url('/phishing/images/gmail-bg.jpg')] bg-cover bg-center">
      <GmailHeader />
      <div className="flex flex-1 gap-0 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64">
          <Sidebar
            doneCount={doneCount}
            progressPct={progressPct}
            score={score}
          />
        </div>

        {/* Email list + reading pane area */}
        <main className="flex-1 gap-0 relative mx-5 mb-5 overflow-hidden">
          <div className="h-full bg-[#0f0f0f]/50 rounded-2xl">
            <GmailEmailList
              emails={shuffledEmails}
              judged={judged}
              onOpen={setOpenEmail}
            />
          </div>

          {openEmail && (
            <div className="absolute inset-0 shadow-2xl border border-[#2c2c2c] rounded-t-lg z-20 animate-slideDown">
              <GmailReadingPane
                selected={openEmail}
                feedback={feedback}
                judge={judge}
                nextEmail={() => nextEmail()}
                close={() => setOpenEmail(null)}
                gameOver={gameOver}
                score={score}
                onBonus={handleBonus}
              />
            </div>
          )}
        </main>
      </div>
      {/* Random call events */}
      <PhoneCallManager onDecision={handleCallDecision} gameOver={gameOver}/>
    </div>
  );
}
