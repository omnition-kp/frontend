import { Headline } from "@/shared/ui";
import { DocumentsProps } from "../types";
import { Document } from "./document";
import { cn } from "@/shared/utils";
import { PADDING_X_CLASS } from "@/shared/config";

export const Documents = ({ documents }: DocumentsProps) => {
    return (
        <div className={cn(PADDING_X_CLASS)}>
            <Headline className="lg:mb-7.5 mob:mb-10 mb-6 text-[#4C4C4C] text-[24px] lg:text-[30px] mob:text-[34px]">
                Документы
            </Headline>

            <div
                className="grid grid-cols-1 gap-5 lg:grid-cols-[repeat(var(--docs-count),1fr)]"
                style={
                    {
                        ["--docs-count" as string]: documents.length,
                    } as React.CSSProperties
                }
            >
                {documents.map((document) => (
                    <Document key={document.path} {...document} />
                ))}
            </div>
        </div>
    );
};
