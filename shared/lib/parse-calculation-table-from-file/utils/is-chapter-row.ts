import { isSummaryRow } from "./is-summary-row";

export const isChapterRow = (row: string[]): boolean => {
    const text = [row[0] ?? "", row[1] ?? ""].join(" ").trim().toLowerCase();

    return (
        text.includes("раздел") &&
        !isSummaryRow(row) &&
        !text.includes("итого по всем разделам") &&
        !text.includes("всего по разделу")
    );
};
