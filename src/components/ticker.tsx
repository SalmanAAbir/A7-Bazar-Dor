import {
  changeDirection,
  getProducts,
  percentLabel,
  priceLabel,
} from "@/lib/bazar";
import { hindSiliguri } from "@/fonts";

const changeColor = {
  up: "text-[#d03739]",
  down: "text-[#1a9951]",
  flat: "text-[#1d271f]",
} as const;

const changeMark = {
  up: "▲",
  down: "▼",
  flat: "—",
} as const;

function TickerList({
  items,
  hidden = false,
}: {
  items: {
    id: string;
    emoji: string;
    name: string;
    price: string;
    change: string;
    direction: keyof typeof changeColor;
  }[];
  hidden?: boolean;
}) {
  return (
    <ul className="flex shrink-0" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li
          key={`${item.id}-${hidden ? "copy" : "main"}`}
          className="flex h-9 shrink-0 items-center gap-1.5 border-r border-[#f0f5f0] px-4 text-[14px] leading-5 text-[#1d271f]"
        >
          <span className="font-normal">{item.emoji}</span>
          <span className="font-medium">{item.name}</span>
          <span className="font-normal">{item.price}</span>
          <span className={`font-semibold ${changeColor[item.direction]}`}>
            {changeMark[item.direction]} {item.change}
          </span>
        </li>
      ))}
    </ul>
  );
}

export async function Ticker() {
  const result = await getProducts();
  const items =
    result.ok
      ? result.data.map((product) => {
          const direction = changeDirection(product.change);
          const unit = product.unit.replace(/^প্রতি\s*/, "");
          return {
            id: product.id,
            emoji: product.emoji,
            name: product.name,
            price: `${priceLabel(product.price)}/${unit}`,
            change: percentLabel(product.change),
            direction,
          };
        })
      : [];

  if (items.length === 0) {
    return <div className={`${hindSiliguri.className} h-[37px] w-full bg-[#fafcfa]`} />;
  }

  const seconds = Math.max(items.length, 6) * 8;

  return (
    <div className={`${hindSiliguri.className} h-[37px] w-full overflow-hidden bg-[#fafcfa]`}>
      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ticker-track { animation: ticker-scroll ${seconds}s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }
      `}</style>
      <div className="ticker-track flex h-full w-max items-center">
        <TickerList items={items} />
        <TickerList items={items} hidden />
      </div>
    </div>
  );
}
