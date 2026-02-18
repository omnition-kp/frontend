/**
 * Форматирует Date или строку/число в локальную дату (DD.MM.YYYY).
 * @param value - дата, строка ISO или timestamp
 * @param locale - локаль (по умолчанию ru-RU)
 */
export const formatDate = (
    value: Date | string | number,
    locale: string = "ru-RU",
): string => {
    const date = typeof value === "object" ? value : new Date(value);
    return date.toLocaleDateString(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

/**
 * Форматирует дату и время (DD.MM.YYYY, HH:MM).
 */
export const formatDateTime = (
    value: Date | string | number,
    locale: string = "ru-RU",
): string => {
    const date = typeof value === "object" ? value : new Date(value);
    return date.toLocaleString(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};
