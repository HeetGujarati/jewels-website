"use client";

import React from "react";
import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type CardT = {
  image?: string;
  initial?: string;
  name: string;
  handle: string;
  text: string;
  rating?: number;
};

const VerifyIcon = () => (
  <BadgeCheck className="w-[14px] h-[14px] text-blue-500 fill-blue-500 text-white inline-block" />
);

const Card = ({ card }: { card: CardT }) => (
  <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-80 shrink-0 bg-white border border-slate-100">
    <div className="flex gap-3">
      {card.image ? (
        <img className="size-11 rounded-full object-cover" src={card.image} alt={card.name} />
      ) : (
        <div className="size-11 rounded-full bg-slate-800 text-amber-500 flex items-center justify-center font-bold text-lg">
          {card.initial || card.name.charAt(0)}
        </div>
      )}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1">
          <p className="font-medium text-slate-900 leading-none">{card.name}</p>
          <VerifyIcon />
        </div>
        <span className="text-xs text-slate-500 mt-1">{card.handle}</span>
      </div>
    </div>
    <div className="flex gap-1 mt-3 text-amber-400">
      {Array.from({ length: card.rating || 5 }).map((_, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
        </svg>
      ))}
    </div>
    <p className="text-sm pt-3 text-gray-700 italic leading-relaxed">
      {card.text}
    </p>
  </div>
);

function MarqueeRow({
  data,
  reverse = false,
  speed = 25,
}: {
  data: CardT[];
  reverse?: boolean;
  speed?: number;
}) {
  const doubled = React.useMemo(() => [...data, ...data], [data]);
  return (
    <div className="relative w-full mx-auto max-w-5xl overflow-hidden isolation-isolate">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 md:w-32 z-10 bg-gradient-to-r from-white to-transparent blur-md" />
      <div
        className={cn(
          "flex transform-gpu min-w-[200%]",
          reverse ? "pt-5 pb-10" : "pt-10 pb-5"
        )}
        style={{
          animation: `marqueeScroll ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((c, i) => (
          <Card key={i} card={c} />
        ))}
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 md:w-32 z-10 bg-gradient-to-l from-white to-transparent blur-md" />
    </div>
  );
}

export default function Marquee({
  row1 = [],
  row2 = [],
}: {
  row1?: CardT[];
  row2?: CardT[];
}) {
  return (
    <>
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="flex flex-col gap-6">
        <MarqueeRow data={row1} reverse={false} speed={25} />
        <MarqueeRow data={row2} reverse={true} speed={25} />
      </div>
    </>
  );
}
