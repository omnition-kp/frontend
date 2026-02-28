export const downloadImage = async (
    url: string,
    filename = "node-design-scheme",
) => {
    const fullUrl = url.startsWith("http")
        ? url
        : `${typeof window !== "undefined" ? window.location.origin : ""}${url.startsWith("/") ? "" : "/"}${url}`;
    const response = await fetch(fullUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${filename}.${blob.type.split("/")[1] || "png"}`;
    link.click();
    URL.revokeObjectURL(blobUrl);
};
