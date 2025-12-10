import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Check, Paperclip, Smile } from "lucide-react";
import type { Chat } from "../../../data/chats";
import PhishTypeModal from "../PhishModal";
import { chatPhishKeyById, type PhishTypeKey } from "../../../data/phishTypes";

interface ChatWindowProps {
  chat: Chat;
  onJudge: (isPhishing: boolean) => void;
  nextChat: () => void;
  gameOver: boolean;
  score: number;
  total: number;
  onBonus?: () => void;
}

export default function ChatWindow({
  chat,
  onJudge,
  nextChat,
  gameOver,
  score,
  onBonus,
}: ChatWindowProps) {
  const [hasJudged, setHasJudged] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showTypeModal, setShowTypeModal] = useState(false);
  // Track judged chat ids so they cannot be re-graded when navigating
  const judgedIdsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    // synchronize local UI state when selected chat changes
    setHasJudged(judgedIdsRef.current.has(chat.id));
    setShowTypeModal(false);
    setInputValue("");
  }, [chat.id]);

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#0b141a] text-white gap-3">
        <div className="text-2xl font-semibold">🎯 Game Over</div>
        <div>
          Final Score: <span className="font-bold">{score}</span>
        </div>
        <button
          onClick={() => location.reload()}
          className="mt-2 rounded-md bg-green-600 hover:bg-green-500 px-4 py-2"
        >
          Play Again
        </button>
      </div>
    );
  }

  function handleJudgeAndAdvance() {
    setTimeout(() => {
      nextChat();
      // judged state is preserved in judgedIdsRef; UI will sync on chat change
      setInputValue("");
    }, 500);
  }

  function handleLegitClick() {
    if (judgedIdsRef.current.has(chat.id)) return;
    onJudge(false);
    judgedIdsRef.current.add(chat.id);
    setHasJudged(true);
    handleJudgeAndAdvance();
  }

  function handlePhishClick() {
    if (judgedIdsRef.current.has(chat.id)) return;
    // open subtype modal first
    setShowTypeModal(true);
  }

  function submitType(picked: PhishTypeKey) {
    setShowTypeModal(false);

    if (judgedIdsRef.current.has(chat.id)) return;

    onJudge(true);
    judgedIdsRef.current.add(chat.id);
    setHasJudged(true);

    const truth = chatPhishKeyById[chat.id] ?? [];
    if (onBonus && truth.includes(picked)) {
      onBonus();
    }

    handleJudgeAndAdvance();
  }

  return (
    <div className="flex-1 flex flex-col bg-center bg-blend-multiply bg-[url('/phishing/images/whatsapp-bg.png')] bg-black/75">
      {/* Contact header */}
      <div className="bg-[#202c33] border-b border-[#2a3942] px-4 py-3 font-semibold text-sm text-white">
        {chat.name}
      </div>

      {/* Chat bubble area */}
      <div className="flex-1 overflow-auto flex flex-col justify-end p-6 gap-3">
        {chat.messages.map((msg, i) => (
          <div
            key={i}
            className="relative self-start bg-gray-700/80 backdrop-blur-lg text-white rounded-lg px-4 py-2 max-w-md shadow-md"
          >
            <span>{msg.text}</span>
            <div className="flex justify-end items-center gap-1 mt-1 text-[10px] text-gray-300 opacity-80">
              <span>{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom input + buttons */}
      <div className="bg-[#202c33] p-3 flex items-center justify-between gap-3">
        {/* Input on the left */}
        <Smile className="w-5 h-5 text-[#8696a0] mr-2 hover:text-white" />
        <Paperclip className="w-5 h-5 text-[#8696a0] mr-2 hover:text-white" />
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 bg-[#202c33] text-[#e9edef] text-sm rounded-lg px-4 py-2 outline-none placeholder-[#8696a0]"
        />

        {/* Buttons on the right */}
        <div className="flex gap-2">
          <button
            disabled={hasJudged}
            onClick={handlePhishClick}
            className={`flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm transition ${
              hasJudged
                ? "opacity-50 cursor-not-allowed"
                : "bg-red-700/30 hover:bg-red-700/40 border-red-600/50 text-red-300"
            }`}
          >
            <AlertTriangle className="w-4 h-4" /> Phishing
          </button>

          <button
            disabled={hasJudged}
            onClick={handleLegitClick}
            className={`flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm transition ${
              hasJudged
                ? "opacity-50 cursor-not-allowed"
                : "bg-green-700/30 hover:bg-green-700/40 border-green-600/50 text-green-300"
            }`}
          >
            <Check className="w-4 h-4" /> Legit
          </button>
        </div>
      </div>

      {/* Phishing Type Modal */}
      <PhishTypeModal
        open={showTypeModal}
        onClose={() => setShowTypeModal(false)}
        onSubmit={submitType}
        title="Which type of phishing is this chat?"
      />
    </div>
  );
}
