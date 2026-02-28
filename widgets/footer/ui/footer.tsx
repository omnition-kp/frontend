import { gtWalsheim, PADDING_X_CLASS } from "@/shared/config";
import { cn } from "@/shared/utils";
import Image from "next/image";
import { LINES_POSITION } from "../config/lines.config";
import Link from "next/link";
import { LINK_BASE_CLASS } from "../config/link-classes";
import { FooterDocumentLink } from "./footer-document-link";
import { DOCUMENTS } from "../config/documents";

export const Footer = () => {
    return (
        <footer className={cn(PADDING_X_CLASS, "bg-[#242426] pt-15 pb-4")}>
            <div className="mb-8 flex">
                <div className="w-[50%] pr-10 pb-10 relative">
                    <Image
                        src={"/logo.svg"}
                        alt="logo"
                        width={1000}
                        height={1000}
                        className="w-full h-auto"
                        unoptimized
                        draggable={false}
                    />

                    <div className={cn(LINES_POSITION.right)} />
                    <div className={cn(LINES_POSITION.bottom)} />
                </div>

                <div className="relative w-[50%] pl-5 flex items-center justify-between gap-5">
                    <div className={cn(LINES_POSITION.bottom1)} />

                    <div className="flex flex-col">
                        <Link
                            href="tel:+74957745434"
                            className={LINK_BASE_CLASS}
                        >
                            +7 (495) 774-54-34
                        </Link>
                        <Link
                            href="mailto:krylov@omniton.ru"
                            className={LINK_BASE_CLASS}
                        >
                            krylov@omniton.ru
                        </Link>
                    </div>

                    <Image
                        src={"/sk.png"}
                        alt="sk"
                        width={1000}
                        height={1000}
                        className="max-w-[133px] h-auto"
                        unoptimized
                        draggable={false}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between mb-3.5">
                {DOCUMENTS.map((document) => (
                    <FooterDocumentLink key={document.link} {...document} />
                ))}
            </div>

            <p
                className={cn(
                    gtWalsheim.className,
                    "text-[#B0B0B0] text-sm font-medium",
                )}
            >
                © Copyright {new Date().getFullYear()}, OMNITON
            </p>
        </footer>
    );
};
