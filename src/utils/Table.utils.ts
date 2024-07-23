import { rankItem } from "@tanstack/match-sorter-utils";
import { Row } from "@tanstack/react-table";
import { Customer } from "../data/types.ts";

interface ItemRankMeta {
  itemRank: ReturnType<typeof rankItem>;
}

export function fuzzyFilter(
  row: Row<Customer>,
  columnId: string,
  value: string,
  addMeta: (meta: ItemRankMeta) => void,
): boolean {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
}

export function convertCamelToTitleCase(text: string): string {
  const result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}
