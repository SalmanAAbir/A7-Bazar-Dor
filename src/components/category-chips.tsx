import { hindSiliguri } from "@/fonts";

const chips = [
  ["🍚", "চাল"],
  ["🫘", "ডাল"],
  ["🛢️", "তেল"],
  ["🥬", "সবজি"],
  ["🐟", "মাছ"],
  ["🍗", "মাংস"],
  ["🥛", "ডিম-দুধ"],
  ["🌶️", "মসলা"],
] as const;

export function CategoryChips() {
  return (
    <div className="pt-px pb-px">
      <nav
        className={`${hindSiliguri.className} mx-auto flex h-12 w-full max-w-[1280px] items-center px-4`}
      >
        <ul className="flex items-center gap-1">
          {chips.map(([icon, label]) => (
            <li key={label}>
              <span className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-transparent px-[13px] text-[12px] leading-[17px] font-semibold text-[#1d271f] hover:border-[#ccd0cc] hover:bg-[#dadeda]">
                <span className="text-[12px] leading-[18px]">{icon}</span>
                {label}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
