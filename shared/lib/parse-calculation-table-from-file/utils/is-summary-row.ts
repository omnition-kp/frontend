import { SUMMARY_MARKERS } from "../config";

export const isSummaryRow = (row: string[]): boolean => {
    const text = [row[0] ?? "", row[1] ?? ""].join(" ").trim().toLowerCase();

    return SUMMARY_MARKERS.some((marker) => text.includes(marker));
};
