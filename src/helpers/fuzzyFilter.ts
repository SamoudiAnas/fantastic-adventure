import { rankItem } from "@tanstack/match-sorter-utils";

const fuzzyFilter = (row: any, columnId: any, value: any, addMeta: any) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the ranking info
  addMeta(itemRank);

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export { fuzzyFilter };
