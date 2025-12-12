import { Check, X } from "lucide-react";
import React from "react";

type TutorialProps = {
	onStart?: () => void;
};

const Tutorial: React.FC<TutorialProps> = ({ onStart }) => {
	return (
		<section
			className="min-h-screen w-full flex items-center justify-center text-slate-50 px-6 py-10 select-none"
		>
			<div className="w-full max-w-3xl bg-[#050610]/85 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.7)] border border-red-900/60 p-6 md:p-8 space-y-6">
				<div className="text-center space-y-2">
					<p className="text-[0.55rem] tracking-[0.35em] uppercase text-red-400 font-sharetech">Phantom's Lab — Truth Finder</p>
					<h1 className="text-2xl md:text-3xl font-bold text-red-500 font-sharetech tracking-[0.25em] uppercase">{__`How to Play`}</h1>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-3">
						<h2 className="text-sm font-semibold text-red-400 uppercase tracking-[0.2em] font-sharetech">{__`Goal`}</h2>
						<p className="text-sm text-slate-200">Review each post and decide if it is <span className="text-emerald-400">{__`True`}</span> or <span className="text-red-400">{__`Fake`}</span>. Look for visual clues and inconsistencies highlighted by hotspots.</p>

						<h2 className="text-sm font-semibold text-red-400 uppercase tracking-[0.2em] font-sharetech">{__`Controls`}</h2>
						<ul className="text-sm text-slate-200 space-y-1 list-disc list-inside">
							<li>Swipe right or press the <span><Check size={15} className="items-center inline-flex"/></span> to mark as True.</li>
							<li>Swipe left or press the <span><X size={15} className="items-center inline-flex"/></span> to mark as Fake.</li>
							<li>Hover hotspots to see labels describing visual clues.</li>
						</ul>
					</div>

					<div className="space-y-3">
						<h2 className="text-sm font-semibold text-red-400 uppercase tracking-[0.2em] font-sharetech">{__`Tips`}</h2>
						<ul className="text-sm text-slate-200 space-y-1 list-disc list-inside">
							<li>Check text consistency: grammar, tone, and capitalization.</li>
							<li>Inspect images: lighting, edges, logo quality, and artifacts.</li>
							<li>Compare sources and dates for credibility.</li>
						</ul>

						<h2 className="text-sm font-semibold text-red-400 uppercase tracking-[0.2em] font-sharetech">{__`End of Round`}</h2>
						<p className="text-sm text-slate-200">After all cards are reviewed, you'll see a summary page with the posts and visual clues.</p>
					</div>
				</div>

				<div className="flex items-center justify-center">
					<button
						type="button"
						onClick={onStart}
						className="px-6 py-2 my-2 rounded-full border border-red-500 text-[0.8rem] tracking-[0.25em] uppercase font-semibold font-sharetech bg-black/40 text-red-300 hover:bg-red-500/10 hover:text-red-100 hover:shadow-[0_0_25px_rgba(248,113,113,0.7)] transition"
					>
						{__`Start`}
					</button>
				</div>
			</div>
		</section>
	);
};

export default Tutorial;
