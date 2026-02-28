import type { AxiosRequestConfig } from "axios";
import { $api, $apiAdmin } from "@/shared/utils";

const normalizeHeaders = (
    headers?: HeadersInit,
): AxiosRequestConfig["headers"] | undefined => {
    if (!headers) return undefined;

    if (headers instanceof Headers) {
        return Object.fromEntries(headers.entries());
    }

    if (Array.isArray(headers)) {
        return Object.fromEntries(headers);
    }

    return headers;
};

export const customInstance = <T>(
    urlOrConfig: string | AxiosRequestConfig,
    options?: RequestInit,
): Promise<T> => {
    const config: AxiosRequestConfig =
        typeof urlOrConfig === "string"
            ? {
                  url: urlOrConfig,
                  method: (options as RequestInit | undefined)?.method as
                      | AxiosRequestConfig["method"]
                      | undefined,
                  headers: normalizeHeaders(
                      (options as RequestInit | undefined)?.headers,
                  ),
                  data: (options as RequestInit | undefined)?.body as unknown,
                  signal:
                      (options as RequestInit | undefined)?.signal ?? undefined,
              }
            : {
                  ...urlOrConfig,
                  ...(options as AxiosRequestConfig | undefined),
              };

    const rawUrl = config.url ?? "";
    const isAdmin =
        rawUrl.startsWith("/api/admin") || rawUrl.startsWith("/admin");

    const normalizedUrl = isAdmin
        ? rawUrl.replace(/^\/api\/admin/, "").replace(/^\/admin/, "")
        : rawUrl;

    const client = isAdmin ? $apiAdmin : $api;

    return client({
        ...config,
        url: normalizedUrl,
    }).then((res) => res.data);
};
