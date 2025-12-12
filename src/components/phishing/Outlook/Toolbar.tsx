import {
  Trash2,
  Archive,
  Shield,
  Folder,
  Reply,
  Forward,
  Clock,
  Printer,
  MoreHorizontal,
  Zap,
  FilePen,
} from "lucide-react";

export default function Toolbar() {
  return (
    <div className="flex items-center gap-3 bg-zinc-900 border-b border-zinc-800 px-3 h-10 text-sm text-zinc-200">
      {/* Left side */}
      <button className="flex items-center gap-2 bg-purple-700 hover:bg-purple-600 text-white px-3 py-1 rounded-md">
        <FilePen size={16} />
        New email
      </button>

      {/* Action buttons */}
      <button className="flex items-center gap-1 opacity-80 hover:opacity-100">
        <Trash2 size={15} /> {__`phishing.deleted`}
      </button>
      <button className="flex items-center gap-1 opacity-80 hover:opacity-100">
        <Archive size={15} /> {__`phishing.archive`}
      </button>
      <button className="flex items-center gap-1 opacity-80 hover:opacity-100">
        <Shield size={15} /> {__`phishing.report`}
      </button>
      <button className="flex items-center gap-1 opacity-80 hover:opacity-100">
        <Folder size={15} /> {__`phishing.moveTo`}
      </button>

      {/* Divider */}
      <div className="w-px h-5 bg-zinc-700 mx-2" />

      {/* Reply section */}
      <button className="flex items-center gap-1 opacity-80 hover:opacity-100">
        <Reply size={15} /> {__`phishing.reply`}
      </button>
      <button className="flex items-center gap-1 opacity-80 hover:opacity-100">
        <Forward size={15} /> {__`phishing.forward`}
      </button>

      <div className="w-px h-5 bg-zinc-700 mx-2" />

      <button className="flex items-center gap-1 opacity-80 hover:opacity-100">
        <Zap size={15} className="text-yellow-400" /> {__`phishing.quickSteps`}
      </button>

      <div className="w-px h-5 bg-zinc-700 mx-2" />

      <button className="flex items-center gap-1 opacity-80 hover:opacity-100">
        <Clock size={15} /> {__`phishing.later`}
      </button>
      <button className="flex items-center gap-1 opacity-80 hover:opacity-100">
        <Printer size={15} /> {__`phishing.print`}
      </button>

      {/* Spacer + More menu */}
      <div className="flex-1" />
      <button className="opacity-80 hover:opacity-100">
        <MoreHorizontal size={18} />
      </button>
    </div>
  );
}
