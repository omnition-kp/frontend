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
    const requestBody = (options as RequestInit | undefined)?.body;
    const normalizedHeaders = normalizeHeaders(
        (options as RequestInit | undefined)?.headers,
    );
    const contentTypeHeader = (() => {
        if (!normalizedHeaders) return "";

        if (Array.isArray(normalizedHeaders)) {
            const entry = normalizedHeaders.find(
                ([key]) => key.toLowerCase() === "content-type",
            );
            return typeof entry?.[1] === "string" ? entry[1] : "";
        }

        const headersRecord = normalizedHeaders as Record<string, unknown>;
        const contentType =
            headersRecord["Content-Type"] ?? headersRecord["content-type"];
        return typeof contentType === "string" ? contentType : "";
    })();
    const shouldParseJsonStringBody =
        typeof requestBody === "string" &&
        contentTypeHeader.toLowerCase().includes("application/json");

    const parsedBody = (() => {
        if (!shouldParseJsonStringBody) {
            return requestBody as unknown;
        }

        try {
            return JSON.parse(requestBody) as unknown;
        } catch {
            return requestBody as unknown;
        }
    })();

    const config: AxiosRequestConfig =
        typeof urlOrConfig === "string"
            ? {
                  url: urlOrConfig,
                  method: (options as RequestInit | undefined)?.method as
                      | AxiosRequestConfig["method"]
                      | undefined,
                  headers: normalizedHeaders,
                  data: parsedBody,
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
        : rawUrl.replace(/^\/api/, ""); // убираем /api для обычного API (baseURL уже содержит /api)

    // Для FormData сбрасываем Content-Type — axios сам выставит multipart/form-data с boundary.
    // Иначе дефолтный application/json от $apiAdmin ломает загрузку файлов (бэк видит files пустым).
    const body = requestBody;
    if (body instanceof FormData) {
        config.headers = {
            ...(config.headers as Record<string, unknown>),
            "Content-Type": undefined,
        } as AxiosRequestConfig["headers"];
    }

    const client = isAdmin ? $apiAdmin : $api;

    return client({
        ...config,
        url: normalizedUrl,
    }).then((res) => res.data);
};
