export interface DeleteImageResult {
    success: boolean;
    error?: string;
}

/**
 * RU: Преобразует URL изображения в массив сегментов пути.
 * EN: Converts an image URL into an array of path segments.
 * @param url - URL вида '/uploads/hero/123.jpg' или полный URL
 */
export function imageUrlToPath(url: string): string[] {
    const pathname = url.startsWith("http") ? new URL(url).pathname : url;
    const segments = pathname.split("/").filter(Boolean);
    const uploadsIndex = segments.indexOf("uploads");
    if (uploadsIndex >= 0 && uploadsIndex < segments.length - 1) {
        return segments.slice(uploadsIndex + 1);
    }
    return segments;
}

/**
 * RU: Удаляет изображение через Next.js API.
 * EN: Deletes an image using the Next.js API route.
 * @param path - Массив строк — сегменты пути к файлу (например: ['hero', '12345678-abc.jpg'])
 *               Первые элементы — папки, последний — имя файла.
 *               Можно передать URL из uploadImage — он будет преобразован автоматически.
 * @returns Результат операции
 */
export async function deleteImage(
    path: string[] | string,
): Promise<DeleteImageResult> {
    const pathSegments = typeof path === "string" ? imageUrlToPath(path) : path;

    if (!pathSegments.length) {
        return { success: false, error: "Path is required" };
    }

    // Всегда используем origin текущего приложения — загрузка идёт через Next.js /api/upload
    const baseUrl =
        typeof window !== "undefined"
            ? window.location.origin
            : process.env.NEXT_PUBLIC_SITE_API_ORIGIN || "";
    const url = `${baseUrl}/api/upload/${pathSegments.join("/")}`;

    try {
        const response = await fetch(url, {
            method: "DELETE",
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.error || "Delete failed",
            };
        }

        return { success: true };
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Unknown error";
        return {
            success: false,
            error: message,
        };
    }
}
