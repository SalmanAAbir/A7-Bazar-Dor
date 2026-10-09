import { CategoryChipLinks } from "@/components/category-chip-links";
import { CategoryChips } from "@/components/category-chips";
import { getCategories } from "@/lib/bazar";

export async function CategoryNav() {
  const result = await getCategories();
  if (!result.ok || result.data.length === 0) return <CategoryChips />;
  return <CategoryChipLinks categories={result.data} />;
}
