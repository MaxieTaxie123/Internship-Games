import { useState } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { chats as allChats } from "../../../data/chats";
import { MessageCircle, Users, Settings, CircleUserRound } from "lucide-react";
import PhoneCallManager from "../PhoneCallManager";

export default function WhatsAppGame() {
  // Shuffle chats for randomness (initialize once to avoid impure calls during render)
  const [shuffledChats] = useState(() => [...allChats].sort(() => Math.random() - 0.5));
  const [selected, setSelected] = useState(() => shuffledChats[0]);
  const [score, setScore] = useState(0);
  const [judgedChats, setJudgedChats] = useState<Record<number, { correct: boolean }>>({});

  // Handle phishing judgment
  function handleJudge(isPhishing: boolean) {
    const correct = selected.isPhishing === isPhishing;
    if (correct) setScore((s) => s + 1);
    setJudgedChats((prev) => ({ ...prev, [selected.id]: { correct } }));
  }

  // bonus point when user picks the correct phishing subtype
  function handleBonus() {
    setScore((s) => s + 1);
  }

  // Move to next chat
  function nextChat() {
    const currentIndex = shuffledChats.findIndex((c) => c.id === selected.id);
    const next = shuffledChats[currentIndex + 1];
    if (next) setSelected(next);
  }

  // Handle call event result (bonus scoring)
  function handleCallDecision(correct: boolean) {
    setScore((s) => (correct ? s + 1 : Math.max(0, s - 1)));
  }

  const gameOver = Object.keys(judgedChats).length === shuffledChats.length;

  return (
    <div className="flex h-screen bg-[#111b21] text-white relative overflow-hidden">
      {/* Sidebar (left icons column) */}
      <div className="w-[72px] bg-[#202c33] flex flex-col items-center py-4 justify-between border-r border-[#2a3942]">
        <div className="flex flex-col items-center gap-6">
          <MessageCircle className="w-6 h-6 text-[#8696a0]" />
          <Users className="w-6 h-6 text-[#8696a0]" />
        </div>
        <div className="flex flex-col items-center gap-6">
          <Settings className="w-6 h-6 text-[#8696a0]" />
          <CircleUserRound className="w-6 h-6 text-[#8696a0]" />
        </div>
      </div>

      {/* Chat list */}
      <div className="w-[360px] bg-[#111b21] border-r border-[#2a3942] flex flex-col">
        <div className="flex items-center border-b border-[#2a3942]">
          <h1 className="text-2xl font-bold text-white p-4 border-b border-[#2a3942]">WhatsLab</h1>
        </div>

        {/* Header search */}
        <div className="p-3 border-b border-[#2a3942]">
          <input
            type="text"
            placeholder={__`phishing.search.chat`}
            className="w-full bg-[#202c33] text-[#8696a0] text-sm rounded-lg px-4 py-2 outline-none"
          />
        </div>

        {/* Chat list */}
        <ChatList
          chats={shuffledChats}
          onSelect={(id) => setSelected(shuffledChats.find((c) => c.id === id)!)}
          selectedId={selected.id}
          judgedChats={judgedChats}
        />

        {/* Score box */}
        <div className="p-3 mt-auto border-t border-[#2a3942] text-xs text-[#8696a0]">
          Score: <span className="text-white font-semibold">{score}</span>
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col">
        <ChatWindow
          chat={selected}
          onJudge={handleJudge}
          nextChat={nextChat}
          gameOver={gameOver}
          score={score}
          total={allChats.length}
          onBonus={handleBonus}
        />
      </div>

      {/* Random call events */}
      <PhoneCallManager onDecision={handleCallDecision} gameOver={gameOver}/>
    </div>
  );
}
