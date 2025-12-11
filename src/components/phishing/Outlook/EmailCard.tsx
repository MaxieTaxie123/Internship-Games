import { Paperclip, Check, X } from "lucide-react";
import type { Email } from "../../../data/emails";

type Props = {
  email: Email;
  selected: boolean;
  onSelect: () => void;
  onJudge: (isPhishing: boolean) => void;
  judged?: boolean;
  isCorrect?: boolean | null;
};

function initials(sender: string) {
  const base = sender.split("@")[0];
  const parts = base.replace(/\W+/g, " ").trim().split(" ");
  const first = parts[0]?.[0] ?? base[0] ?? "?";
  const second = parts[1]?.[0] ?? "";
  return (first + second).toUpperCase();
}

// Helper: format like "Sat 14:48"
function formattedDateTime(date: Date): string {
  const day = date.toLocaleDateString("en-US", { weekday: "short" });
  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${day} ${time}`;
}

export default function EmailCard({
  email,
  selected,
  onSelect,
  judged,
  isCorrect,
}: Props) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-3 border transition
        ${
          selected
            ? "bg-[#55576b] border-transparent"
            : "hover:bg-[#111111]/20 border-t border-[#5c5b5b] bg-[#292929]"
        }`}
    >
      <div className="flex gap-3 items-start">
        {/* Sender circle */}
        <div className="shrink-0 w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-semibold text-white">
          {email.icon || initials(email.sender)}
        </div>

        {/* Email content */}
        <div className="min-w-0 flex-1 flex flex-col gap-0.5">
          {/* Sender */}
          <div className="flex items-center justify-between">
            <span className="truncate font-semibold text-sm text-white">
              {email.sender}
            </span>
            <Paperclip className="w-3 h-3 text-zinc-400 opacity-0" aria-hidden />
          </div>

          {/* Subject and Time */}
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-sm text-zinc-200 font-medium flex-1 min-w-0">
              {email.subject}
            </span>
            <span className="shrink-0 text-xs text-zinc-400 whitespace-nowrap">
              {formattedDateTime(email.date)}
            </span>
          </div>

          {/* Preview */}
          <div className="text-xs text-zinc-400 truncate">{email.body}</div>
        </div>

        {/* ✅ / ❌ Indicator */}
        <div className="flex flex-col items-center justify-center pl-1">
          {judged &&
            (isCorrect ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <X className="w-4 h-4 text-red-400" />
            ))}
        </div>
      </div>
    </button>
  );
}
