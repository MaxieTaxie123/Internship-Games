import EmailCard from "./EmailCard";
import type { Email } from "../../../data/emails";

interface EmailListProps {
  emails: Email[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onJudge: (email: Email, isPhishing: boolean) => void;
  judgedCorrect: Record<number, boolean | undefined>;
}

export default function EmailList({
  emails,
  selectedId,
  onSelect,
  onJudge,
  judgedCorrect,
}: EmailListProps) {
  return (
    <section className="h-full min-h-0 overflow-y-auto p-2">
      {emails.map((email) => (
        <div key={email.id} className="group">
          <EmailCard
            email={email}
            selected={selectedId === email.id}
            onSelect={() => onSelect(email.id)}
            onJudge={(isPhishing) => onJudge(email, isPhishing)}
            judged={judgedCorrect[email.id] !== undefined}
            isCorrect={judgedCorrect[email.id] ?? null} // true/false for correctness
          />
        </div>
      ))}
    </section>
  );
}
