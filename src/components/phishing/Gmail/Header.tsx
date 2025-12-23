import { Search, Settings, Sparkle, Grip, HelpCircle, TextAlignJustify } from "lucide-react";

export default function GmailHeader() {
  return (
    <header className="h-14 flex gap-0 items-center justify-between px-4">
      {/* Gmail logo */}
      <div className="flex items-center gap-2">
        <TextAlignJustify size={20} />
        <span className="text-white text-2xl">PhantomMail</span>
      </div>

      {/* Search bar */}
      <div className="flex-1 flex justify-center px-6 gap-0">
        <div className="flex gap-0 items-center bg-[#303134] rounded-full px-4 py-2 w-full max-w-xl">
          <Search className="w-5 h-5 text-[#9aa0a6]" />
          <input
            type="text"
            placeholder={__`phishing.search.mail`}
            className="bg-transparent outline-none ml-3 text-sm text-white placeholder-[#9aa0a6] w-full"
          />
        </div>
      </div>

      {/* Right side icons */}
      <div className="flex items-center gap-4 text-white">
        <HelpCircle className="w-5 h-5 cursor-pointer" />
        <Settings className="w-5 h-5 cursor-pointer" />
        <Sparkle className="w-5 h-5 cursor-pointer fill-[#9aa0a6]" />
        <Grip className="w-5 h-5 cursor-pointer" />
        <div className="w-8 h-8 rounded-full bg-[#3c4043] flex items-center justify-center font-semibold">
          U
        </div>
      </div>
    </header>
  );
}
