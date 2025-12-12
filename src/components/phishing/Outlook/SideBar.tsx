import { Inbox, Folder, Archive, Trash2, Mail, StickyNote } from "lucide-react";

interface SidebarProps {
  doneCount: number;
  progressPct: number;
  score: number;
}

export default function Sidebar({ doneCount, progressPct, score }: SidebarProps) {
  return (
    <aside className="bg-zinc-950 p-3 flex flex-col h-full overflow-auto m-0">
      <nav className="space-y-1">
        <a className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-800/50 cursor-default">
          <Inbox className="w-4 h-4" /> {__`phishing.inbox`}
        </a>
        <a className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-800/50">
          <Mail className="w-4 h-4" /> {__`phishing.drafts`}
        </a>
        <a className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-800/50">
          <Folder className="w-4 h-4" /> {__`phishing.sent`}
        </a>
        <a className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-800/50">
          <Trash2 className="w-4 h-4" /> {__`phishing.deleted`}
        </a>
        <a className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-800/50">
          <StickyNote className="w-4 h-4 rotate-90" /> {__`phishing.notes`}
        </a>
        <a className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-800/50">
          <Archive className="w-4 h-4" /> {__`phishing.archive`}
        </a>
      </nav>

      <div className="p-3 rounded-2xl bg-zinc-800/50 border border-zinc-700 mt-auto">
        <div className="text-sm font-semibold mb-1">{__`phishing.status`}</div>
        <div className="text-xs text-zinc-400 mb-2">
          {doneCount} {__`phishing.checked`}
        </div>
        <div className="h-2 rounded-full bg-zinc-700 overflow-hidden">
          <div className="h-2 bg-emerald-500" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="mt-2 text-sm">
          {__`Score`}: <span className="font-semibold">{score}</span>
        </div>
      </div>
    </aside>
  );
}
