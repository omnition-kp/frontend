/**
 * RU: Получает формат файла из пути.
 * EN: Gets the file format from the path.
 * @param path - path to the file
 * @returns file format
 */
export const getFileFormat = (path: string): string => {
    const format = path.split(".").pop()?.toUpperCase();

    return format ?? "PDF";
};
