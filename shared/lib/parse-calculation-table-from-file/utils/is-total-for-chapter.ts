export const isTotalForChapter = (row: string[]): boolean => {
    const text = [row[0] ?? "", row[1] ?? ""].join(" ").trim().toLowerCase();

    return text.includes("всего по разделу");
};
