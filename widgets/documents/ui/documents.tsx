import { Headline } from "@/shared/ui";
import { DocumentsProps } from "../types";
import { Document } from "./document";
import { cn } from "@/shared/utils";
import { PADDING_X_CLASS } from "@/shared/config";

export const Documents = ({ documents }: DocumentsProps) => {
    return (
        <div className={cn(PADDING_X_CLASS)}>
            <Headline className="mb-7.5 text-[#4C4C4C]">Документы</Headline>

            <div
                className="grid gap-5"
                style={{
                    gridTemplateColumns: `repeat(${documents.length}, 1fr)`,
                }}
            >
                {documents.map((document) => (
                    <Document key={document.path} {...document} />
                ))}
            </div>
        </div>
    );
};
