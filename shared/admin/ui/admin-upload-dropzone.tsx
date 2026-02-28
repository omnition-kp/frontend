"use client";

import {
    cloneElement,
    isValidElement,
    useEffect,
    useId,
    useRef,
    useState,
    type DragEvent,
} from "react";
import { ImageUpIcon } from "lucide-react";
import { cn } from "@/shared/utils";
import { onest } from "@/shared/config";
import type { AdminUploadDropzoneProps } from "../types";

export const AdminUploadDropzone = ({
    className,
    icon,
    topText = "Перетащите изображение сюда",
    bottomText = "или нажмите, чтобы выбрать файл",
    initialPreviewUrl = null,
    initialPreviewAlt = "Текущее изображение",
    invalidFileErrorText,
    uploadProgress = null,
    isUploading = false,
    disabled,
    onFileChange,
    onFilesChange,
    accept = "image/*",
    multiple = false,
    ...props
}: AdminUploadDropzoneProps) => {
    const inputId = useId();
    const inputRef = useRef<HTMLInputElement>(null);
    const dragDepthRef = useRef(0);
    const [isDragActive, setIsDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFileLabel, setSelectedFileLabel] = useState<string | null>(
        null,
    );
    const [validationError, setValidationError] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const renderedIcon = icon ?? <ImageUpIcon />;
    const displayedPreviewUrl = previewUrl ?? initialPreviewUrl;

    const normalizedIcon = isValidElement<{
        className?: string;
        width?: number | string;
        height?: number | string;
    }>(renderedIcon)
        ? cloneElement(renderedIcon, {
              width: 20,
              height: 20,
              className: cn(renderedIcon.props.className, "w-5 h-5"),
          })
        : renderedIcon;

    const getFileLabel = (file: File | null) => {
        if (!file) {
            return null;
        }

        const sizeKb = Math.max(1, Math.round(file.size / 1024));
        return `${file.name} (${sizeKb} KB)`;
    };

    const getAcceptTokens = () =>
        (accept ?? "")
            .split(",")
            .map((value) => value.trim().toLowerCase())
            .filter(Boolean);

    const getReadableAccept = () => {
        const tokens = getAcceptTokens();

        if (!tokens.length) {
            return "поддерживаемые форматы";
        }

        return tokens.join(", ");
    };

    const isFileAccepted = (file: File) => {
        const tokens = getAcceptTokens();

        if (!tokens.length) {
            return true;
        }

        const fileName = file.name.toLowerCase();
        const fileType = file.type.toLowerCase();

        return tokens.some((token) => {
            if (token.startsWith(".")) {
                return fileName.endsWith(token);
            }

            if (token.endsWith("/*")) {
                const mimeGroup = token.replace("/*", "");
                return fileType.startsWith(`${mimeGroup}/`);
            }

            return fileType === token;
        });
    };

    useEffect(() => {
        if (!selectedFile || !selectedFile.type.startsWith("image/")) {
            queueMicrotask(() => setPreviewUrl(null));
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        queueMicrotask(() => setPreviewUrl(objectUrl));

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [selectedFile]);

    const handleFilesChange = (files: FileList | null) => {
        const file = files?.[0] ?? null;

        if (file && !isFileAccepted(file)) {
            setValidationError(
                invalidFileErrorText ??
                    `Этот формат нельзя загрузить. Разрешено: ${getReadableAccept()}`,
            );
            onFilesChange?.(null);
            onFileChange?.(null);
            return false;
        }

        setValidationError(null);
        setSelectedFile(file);
        setSelectedFileLabel(getFileLabel(file));
        onFilesChange?.(files);
        onFileChange?.(file);
        return true;
    };

    const handleDragEnter = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        if (disabled) {
            return;
        }

        dragDepthRef.current += 1;
        setIsDragActive(true);
    };

    const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);

        if (dragDepthRef.current === 0) {
            setIsDragActive(false);
        }
    };

    return (
        <div className={cn("w-full", className)}>
            <input
                id={inputId}
                ref={inputRef}
                type="file"
                className="sr-only"
                disabled={disabled}
                accept={accept}
                multiple={multiple}
                onChange={(event) => {
                    const isValid = handleFilesChange(event.target.files);
                    if (!isValid) {
                        event.target.value = "";
                    }
                }}
                {...props}
            />

            <label
                htmlFor={inputId}
                aria-disabled={disabled}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={(event) => {
                    event.preventDefault();
                    if (!disabled) {
                        setIsDragActive(true);
                    }
                }}
                onDrop={(event) => {
                    event.preventDefault();
                    dragDepthRef.current = 0;
                    setIsDragActive(false);

                    if (disabled) {
                        return;
                    }

                    const droppedFiles = event.dataTransfer.files;
                    const isValid = handleFilesChange(droppedFiles);

                    if (isValid && inputRef.current) {
                        inputRef.current.files = droppedFiles;
                    }
                }}
                className={cn(
                    onest.className,
                    "w-full min-h-[132px] rounded-[4px] border border-[#E7E7E7] bg-[#F7F7F7]",
                    "flex flex-col items-center justify-center gap-1 px-4 py-6 text-center transition-all duration-150",
                    isDragActive &&
                        "border-[1.5px] border-dashed border-black bg-[#ECECEC] scale-[1.01]",
                    disabled
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer hover:bg-[#F2F2F2]",
                )}
            >
                <span
                    className={cn(
                        "text-black transition-transform",
                        isDragActive && "translate-y-[-2px]",
                    )}
                >
                    {normalizedIcon}
                </span>
                <p className="text-[12px] leading-[120%] text-black">
                    {isDragActive ? "Отпустите файл, чтобы загрузить" : topText}
                </p>
                <p className="text-[12px] leading-[120%] text-[#7A7A7A]">
                    {isUploading
                        ? "Идёт загрузка изображения..."
                        : isDragActive
                          ? "Файл добавится автоматически"
                          : bottomText}
                </p>
                {selectedFileLabel && (
                    <p className="text-[12px] leading-[120%] text-black/65">
                        Выбрано: {selectedFileLabel}
                    </p>
                )}
                {validationError && (
                    <p className="text-[12px] leading-[120%] text-red-500">
                        {validationError}
                    </p>
                )}
                {isUploading && uploadProgress !== null && (
                    <div className="mt-2 w-full max-w-[260px]">
                        <div className="h-[6px] w-full overflow-hidden rounded-full bg-black/10">
                            <div
                                className="h-full rounded-full bg-black transition-[width] duration-150"
                                style={{
                                    width: `${Math.max(
                                        0,
                                        Math.min(100, uploadProgress),
                                    )}%`,
                                }}
                            />
                        </div>
                        <p className="mt-1 text-[12px] leading-[120%] text-black/65">
                            Загрузка:{" "}
                            {Math.max(0, Math.min(100, uploadProgress))}%
                        </p>
                    </div>
                )}
                {displayedPreviewUrl && (
                    <div className="mt-2 w-[86px] h-[86px] rounded-[4px] overflow-hidden border border-black/10 bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element -- preview uses blob URL */}
                        <img
                            src={displayedPreviewUrl}
                            alt={
                                previewUrl
                                    ? "Предпросмотр загруженного файла"
                                    : initialPreviewAlt
                            }
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </label>
        </div>
    );
};
