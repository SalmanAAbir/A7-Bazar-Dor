const bengaliDigits = "০১২৩৪৫৬৭৮৯";

export function toBengaliNumber(value: number, fractionDigits = 0) {
  const text = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
  return text.replace(/[0-9]/g, (digit) => bengaliDigits[Number(digit)] ?? digit);
}
