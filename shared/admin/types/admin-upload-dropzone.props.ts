import type { InputHTMLAttributes, ReactNode } from "react";

export interface AdminUploadDropzoneProps extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange"
> {
    icon?: ReactNode;
    topText?: ReactNode;
    bottomText?: ReactNode;
    initialPreviewUrl?: string | null;
    initialPreviewAlt?: string;
    invalidFileErrorText?: string;
    uploadProgress?: number | null;
    isUploading?: boolean;
    onFileChange?: (file: File | null) => void;
    onFilesChange?: (files: FileList | null) => void;
}
