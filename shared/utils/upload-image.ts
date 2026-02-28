export interface UploadImageResult {
    success: boolean;
    url?: string;
    error?: string;
}

export interface UploadImageOptions {
    onProgress?: (progress: number) => void;
}

/**
 * RU: Загружает изображение через Next.js API.
 * EN: Uploads an image using the Next.js API route.
 * @param file - Файл для загрузки
 * @param path - Массив строк — сегменты пути, куда отправить (например: ['hero'], ['products', '123'])
 * @returns Результат с URL загруженного изображения или ошибкой
 */
export async function uploadImage(
    file: File,
    path: string[],
    options?: UploadImageOptions,
): Promise<UploadImageResult> {
    if (!path.length) {
        return { success: false, error: "Path is required" };
    }

    const baseUrl =
        typeof window !== "undefined"
            ? window.location.origin
            : process.env.NEXT_PUBLIC_SITE_API_ORIGIN || "";
    const url = `${baseUrl}/api/upload/${path.join("/")}`;

    const formData = new FormData();
    formData.append("file", file);

    return new Promise<UploadImageResult>((resolve) => {
        const request = new XMLHttpRequest();
        request.open("POST", url, true);
        request.withCredentials = true;

        request.upload.onprogress = (event) => {
            if (!event.lengthComputable) {
                return;
            }

            const progress = Math.round((event.loaded / event.total) * 100);
            options?.onProgress?.(progress);
        };

        request.onload = () => {
            let data: { error?: string; url?: string } = {};

            try {
                data = request.responseText
                    ? (JSON.parse(request.responseText) as {
                          error?: string;
                          url?: string;
                      })
                    : {};
            } catch {
                data = {};
            }

            if (request.status < 200 || request.status >= 300) {
                resolve({
                    success: false,
                    error: data.error || "Upload failed",
                });
                return;
            }

            options?.onProgress?.(100);

            resolve({
                success: true,
                url: data.url,
            });
        };

        request.onerror = () => {
            resolve({
                success: false,
                error: "Network error",
            });
        };

        request.send(formData);
    });
}
