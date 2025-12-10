import { Check, X } from "lucide-react";
import type { Email } from "../../../data/emails";

interface GmailEmailListProps {
  emails: Email[];
  judged: Record<number, boolean | undefined>;
  onOpen: (email: Email) => void;
}

function formatDate(date: Date) {
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

export default function GmailEmailList({ emails, judged, onOpen }: GmailEmailListProps) {
  return (
    <div className="overflow-y-auto h-full bg-[#242424]/40 border-r border-[#2c2c2c]/60 rounded-lg py-2">
      {emails.map((email) => {
        const judgedResult = judged[email.id];
        const dateLabel = formatDate(email.date);

        return (
          <button
            key={email.id}
            onClick={() => onOpen(email)}
            className="w-full text-left flex gap-0 items-center justify-between px-4 py-2 border-b border-[#2c2c2c]/60 hover:bg-[#2a2a2a]/70 transition"
          >
            {/* Checkbox placeholder (like Gmail) */}
            <div className="w-4 h-4 border border-[#5f6368] rounded-sm mr-3" />

            {/* Main content */}
            <div className="flex-1 flex gap-0 items-center justify-between overflow-hidden">
              {/* Left: sender, subject, snippet */}
              <div className="flex-1 min-w-0 gap-0">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-[#e8eaed] truncate max-w-[140px]">
                    {email.sender}
                  </span>
                  <span className="text-[#e8eaed] font-medium truncate">
                    &nbsp;{email.subject}
                  </span>
                  <span className="text-[#9aa0a6] truncate ml-1">– {email.body}</span>
                </div>
              </div>

              {/* Right: date */}
              <div className="ml-2 text-xs text-[#9aa0a6] whitespace-nowrap">
                {dateLabel}
              </div>
            </div>

            {/* ✅/❌ Indicator */}
            {judgedResult !== undefined && (
              judgedResult ? (
                <Check className="w-4 h-4 text-green-400 ml-3 shrink-0" />
              ) : (
                <X className="w-4 h-4 text-red-400 ml-3 shrink-0" />
              )
            )}
          </button>
        );
      })}
    </div>
  );
}
