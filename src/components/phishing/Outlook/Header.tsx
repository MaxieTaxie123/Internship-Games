import {
  Grip,
  Search,
  MessagesSquare,
  CalendarDays,
  Bell,
  Settings,
  User,
  Notebook,
} from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#6f40ff] text-white h-12 flex items-center justify-between px-4">
      {/* Left section: App launcher + Outlook text */}
      <div className="flex items-center gap-2 min-w-40">
        <Grip className="w-5 h-5" />
        <span className="font-semibold text-sm tracking-wide pl-4">Phantomlook</span>
      </div>

      {/* Center: Search bar */}
      <div className="flex-1 flex justify-center">
        <div className="flex items-center gap-2 bg-[#2a2d34] rounded-md px-3 py-1.5 w-full max-w-md">
          <Search className="w-4 h-4 text-white/80" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-sm text-white placeholder-white/80 w-full outline-none border-none"
          />
        </div>
      </div>

      {/* Right section: Icons + user avatar */}
      <div className="flex items-center gap-7 min-w-[200px] justify-end">
        <MessagesSquare className="w-4 h-4 text-white" />
        <Notebook className="w-4 h-4 text-white" />
        <CalendarDays className="w-4 h-4 text-white" />
        <Bell className="w-4 h-4 text-white" />
        <Settings className="w-4 h-4 text-white" />
        <div className="w-8 h-8 rounded-full border border-white/80 flex items-center justify-center text-xs font-semibold">
          <User className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
}
