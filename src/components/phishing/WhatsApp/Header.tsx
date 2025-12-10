import { Phone, Video, MoreVertical, ArrowLeft } from "lucide-react";

export default function Header({ contact }: { contact: string }) {
  return (
    <header className="bg-[#202C33] h-14 flex items-center px-4 text-white">
      <ArrowLeft className="mr-3 w-5 h-5 cursor-pointer" />
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-zinc-500 flex items-center justify-center text-sm font-semibold">
          {contact[0].toUpperCase()}
        </div>
        <div>
          <div className="font-medium">{contact}</div>
          <div className="text-xs text-zinc-400">last seen today at 14:22</div>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Video className="w-5 h-5 text-zinc-300" />
        <Phone className="w-5 h-5 text-zinc-300" />
        <MoreVertical className="w-5 h-5 text-zinc-300" />
      </div>
    </header>
  );
}
