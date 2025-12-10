import { Inbox, Star, Send, FileText, ShoppingBag, ChevronDown, Plus, Pen } from "lucide-react";

interface SidebarProps {
  doneCount: number;
  progressPct: number;
  score: number;
}

export default function Sidebar({ doneCount, progressPct, score }: SidebarProps) {
  const folders = [
    { icon: <Inbox className="w-4 h-4" />, label: "Inbox", count: "4,792" },
    { icon: <Star className="w-4 h-4" />, label: "Starred" },
    { icon: <Send className="w-4 h-4" />, label: "Sent" },
    { icon: <FileText className="w-4 h-4" />, label: "Drafts" },
    { icon: <ShoppingBag className="w-4 h-4" />, label: "Purchases" },
  ];

  const labels = ["Notes", "Unwanted"];

  return (
    <aside className="h-full p-3 flex flex-col text-sm">
      <button className="bg-[#c2e7ff] text-[#001d35] rounded-3xl px-4 py-2 font-semibold mb-4 flex items-center gap-2">
        <Pen className="w-4 h-4" /> Compose
      </button>

      <nav className="space-y-1 mb-6">
        {folders.map((f) => (
          <div
            key={f.label}
            className="flex justify-between items-center px-3 py-2 rounded-lg hover:bg-[#2c2c2c]/60 cursor-pointer transition"
          >
            <div className="flex items-center gap-3 text-[#e8eaed]">
              {f.icon}
              <span>{f.label}</span>
            </div>
            {f.count && <span className="text-xs text-[#9aa0a6]">{f.count}</span>}
          </div>
        ))}
        <div className="flex items-center gap-3 text-[#9aa0a6] px-3 py-2 hover:bg-[#2c2c2c]/60 cursor-pointer rounded-lg">
          <ChevronDown className="w-4 h-4" /> <span>More</span>
        </div>
      </nav>

      <div className="text-[#9aa0a6] text-xs mb-2 px-3">Labels</div>
      {labels.map((l) => (
        <div
          key={l}
          className="flex items-center gap-3 px-3 py-1.5 text-[#e8eaed] hover:bg-[#2c2c2c]/60 rounded-lg cursor-pointer"
        >
          <Plus className="w-3 h-3" /> {l}
        </div>
      ))}

      <div className="p-3 rounded-2xl bg-zinc-800/50 border border-zinc-700 mt-auto">
        <div className="text-sm font-semibold mb-1">Game status</div>
        <div className="text-xs text-zinc-400 mb-2">
          {doneCount} checked
        </div>
        <div className="h-2 rounded-full bg-zinc-700 overflow-hidden">
          <div className="h-2 bg-emerald-500" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="mt-2 text-sm">
          Score: <span className="font-semibold">{score}</span>
        </div>
      </div>

      <div className="mt-auto border-t border-[#2c2c2c]/60 pt-3 text-xs text-[#9aa0a6]">
        <div>50% of 15GB used</div>
        <div className="w-full bg-[#2c2c2c]/60 h-1 rounded mt-1 mb-2">
          <div className="h-1 bg-[#8ab4f8]" style={{ width: "50%" }} />
        </div>
        <div>Last account activity: 35 minutes ago</div>
      </div>
    </aside>
  );
}
