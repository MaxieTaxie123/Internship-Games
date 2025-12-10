import { Check, X } from "lucide-react";
import type { Chat } from "../../../data/chats";

interface ChatListProps {
  chats: Chat[];
  selectedId: number;
  onSelect: (id: number) => void;
  judgedChats: Record<number, { correct: boolean }>;
}

export default function ChatList({ chats, selectedId, onSelect, judgedChats }: ChatListProps) {
  // ✅ Sort chats ascending by the last message time
  const sortedChats = [...chats].sort((b, a) => {
    const aMsg = a.messages[a.messages.length - 1];
    const bMsg = b.messages[b.messages.length - 1];

    const aTime = extractNumericTime(aMsg?.time ?? "");
    const bTime = extractNumericTime(bMsg?.time ?? "");

    return aTime - bTime;
  });

  return (
    <div className="flex-1 overflow-auto">
      {sortedChats.map((chat) => {
        const judged = judgedChats[chat.id];
        const isSelected = selectedId === chat.id;

        // ✅ Safely grab the last message
        const lastMsg = chat.messages[chat.messages.length - 1];
        const previewText = lastMsg?.text ?? "";
        const time = lastMsg?.time ?? "";

        return (
          <button
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={`w-full text-left px-4 py-3 flex justify-between items-center border-b border-[#2a3942] hover:bg-[#202c33] transition ${
              isSelected ? "bg-[#2a3942]" : ""
            }`}
          >
            {/* Left side: Chat info */}
            <div className="flex flex-col">
              <span className="font-semibold text-white text-sm">{chat.name}</span>
              <span className="text-[#8696a0] text-xs truncate w-48">
                {previewText}
              </span>
            </div>

            {/* Right side: Time + judgment icon */}
            <div className="flex flex-col items-end text-[#8696a0] text-xs min-w-[55px]">
              <span>{time}</span>
              {judged && (
                judged.correct ? (
                  <Check className="w-3.5 h-3.5 text-green-400 mt-1" />
                ) : (
                  <X className="w-3.5 h-3.5 text-red-400 mt-1" />
                )
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ✅ Helper: Convert a time string into a comparable number
function extractNumericTime(timeStr: string): number {
  // Matches something like "11:42", "09:15", etc.
  const match = timeStr.match(/(\d{1,2}):(\d{2})/);
  if (!match) return Number.MAX_SAFE_INTEGER; // Non-numeric times go to bottom
  const [, h, m] = match;
  return parseInt(h) * 100 + parseInt(m);
}
