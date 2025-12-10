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
        <Trash2 size={15} /> Delete
      </button>
      <button className="flex items-center gap-1 opacity-80 hover:opacity-100">
        <Archive size={15} /> Archive
      </button>
      <button className="flex items-center gap-1 opacity-80 hover:opacity-100">
        <Shield size={15} /> Report
      </button>
      <button className="flex items-center gap-1 opacity-80 hover:opacity-100">
        <Folder size={15} /> Move to
      </button>

      {/* Divider */}
      <div className="w-px h-5 bg-zinc-700 mx-2" />

      {/* Reply section */}
      <button className="flex items-center gap-1 opacity-80 hover:opacity-100">
        <Reply size={15} /> Reply
      </button>
      <button className="flex items-center gap-1 opacity-80 hover:opacity-100">
        <Forward size={15} /> Forward
      </button>

      <div className="w-px h-5 bg-zinc-700 mx-2" />

      <button className="flex items-center gap-1 opacity-80 hover:opacity-100">
        <Zap size={15} className="text-yellow-400" /> Quick steps
      </button>

      <div className="w-px h-5 bg-zinc-700 mx-2" />

      <button className="flex items-center gap-1 opacity-80 hover:opacity-100">
        <Clock size={15} /> Later
      </button>
      <button className="flex items-center gap-1 opacity-80 hover:opacity-100">
        <Printer size={15} /> Print
      </button>

      {/* Spacer + More menu */}
      <div className="flex-1" />
      <button className="opacity-80 hover:opacity-100">
        <MoreHorizontal size={18} />
      </button>
    </div>
  );
}
