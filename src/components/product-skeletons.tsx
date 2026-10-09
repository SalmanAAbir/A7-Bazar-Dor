export function ProductSkeletons() {
  return (
    <div className="flex flex-col gap-10">
      {Array.from({ length: 2 }, (_, section) => (
        <div key={section} className="flex flex-col gap-3">
          <div className="h-7 w-48 animate-pulse rounded bg-[#e1e8e1]" />
          <ul className="flex flex-wrap gap-4">
            {Array.from({ length: 6 }, (_, card) => (
              <li
                key={card}
                className="h-[138px] w-full animate-pulse rounded-2xl bg-[#fafcfa] md:w-[363px]"
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
