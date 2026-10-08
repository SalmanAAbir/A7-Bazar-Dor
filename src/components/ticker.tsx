import { hindSiliguri } from "@/fonts";

const items = [
  {
    icon: "🍚",
    name: "স্বর্ণমাছি চাল",
    price: "১৪৮ টাকা/কেজি",
    change: "▲ ২.১%",
    up: true,
  },
  {
    icon: "🍚",
    name: "মিনিকেট চাল",
    price: "৯৯ টাকা/কেজি",
    change: "▼ ২.৯%",
    up: false,
  },
  {
    icon: "🍚",
    name: "বাটাম সাইজ চাল",
    price: "৬৬ টাকা/কেজি",
    change: "▲ ৩.১%",
    up: true,
  },
  {
    icon: "🫘",
    name: "মসুর ডাল",
    price: "১৪২ টাকা/কেজি",
    change: "▲ ২.৯%",
    up: true,
  },
  {
    icon: "🫘",
    name: "ছোলা",
    price: "১২০ টাকা/কেজি",
    change: "▼ ২.৪%",
    up: false,
  },
  {
    icon: "🫘",
    name: "আমন ডাল (খোসাসিলা)",
    price: "১৫৬ টাকা/কেজি",
    change: "▲ ২.৬%",
    up: true,
  },
] as const;

function TickerList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li
          key={item.name}
          className="flex h-9 shrink-0 items-center gap-1.5 border-r border-[#f0f5f0] px-4 text-[14px] leading-5 text-[#1d271f]"
        >
          <span className="font-normal">{item.icon}</span>
          <span className="font-medium">{item.name}</span>
          <span className="font-normal">{item.price}</span>
          <span
            className={`font-semibold ${item.up ? "text-[#d03739]" : "text-[#1a9951]"}`}
          >
            {item.change}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Ticker() {
  return (
    <div className={`${hindSiliguri.className} h-[37px] w-full overflow-hidden bg-[#fafcfa]`}>
      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ticker-track { animation: ticker-scroll 40s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }
      `}</style>
      <div className="ticker-track flex h-full w-max items-center">
        <TickerList />
        <TickerList hidden />
      </div>
    </div>
  );
}
