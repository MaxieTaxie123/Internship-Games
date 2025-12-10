import { Check, X } from "lucide-react";

type ActionButtonsProps = {
  onNope?: () => void;
  onTruth?: () => void;
};

export default function ActionButtons({ onNope, onTruth }: ActionButtonsProps) {
  return (
    <div className={`flex items-center justify-center space-x-4 mb-5 h-max p-1`}>
      <button
        className="p-2 rounded-full bg-white text-red-500 border-2 transition-colors duration-300 ease-out border-red-500 hover:bg-red-500 hover:text-white shadow cursor-pointer"
        onClick={onNope}
      >
        <X />
      </button>
      <button
        className="p-2 rounded-full bg-white text-green-500 border-2 transition-colors duration-300 ease-out border-green-500 hover:bg-green-500 hover:text-white shadow cursor-pointer"
        onClick={onTruth}
      >
        <Check />
      </button>
    </div>
  );
}
