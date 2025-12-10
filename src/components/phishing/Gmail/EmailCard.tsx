import type { Email } from "../../../data/emails";
import { Check, X } from "lucide-react";

type Props = {
  email: Email;
  selected: boolean;
  onSelect: () => void;
  judged?: boolean;
  isCorrect?: boolean | null;
};

function formattedDate(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = diff / (1000 * 60 * 60 * 24);

  if (days < 1) {
    return date.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
  } else if (days < 7) {
    return date.toLocaleDateString("nl-NL", { weekday: "short" });
  } else {
    return date.toLocaleDateString("nl-NL", { day: "2-digit", month: "short" });
  }
}

export default function EmailCard({ email, selected, onSelect, judged, isCorrect }: Props) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left px-4 py-2 border-b border-slate-200 flex items-center hover:bg-slate-100 transition ${
        selected ? "bg-slate-200" : ""
      }`}
    >
      {/* Checkbox placeholder */}
      <div className="w-4 h-4 border border-slate-400 rounded-sm mr-3" />

      {/* Sender + subject + body */}
      <div className="flex-1 flex items-center justify-between overflow-hidden">
        <div className="flex-1 min-w-0">
          {/* Sender + subject */}
          <div className="flex items-center gap-1">
            <span className="font-semibold text-slate-800 truncate max-w-[150px]">
              {email.sender}
            </span>
            <span className="text-slate-700 truncate font-medium">
              &nbsp;{email.subject}
            </span>
            <span className="text-slate-500 truncate ml-1">– {email.body}</span>
          </div>
        </div>

        {/* Right side: date */}
        <div className="ml-2 text-xs text-slate-500 whitespace-nowrap">
          {formattedDate(email.date)}
        </div>
      </div>

      {/* ✅/❌ Indicator */}
      {judged && (
        <div className="ml-2 flex items-center">
          {isCorrect ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <X className="w-4 h-4 text-red-500" />
          )}
        </div>
      )}
    </button>
  );
}
