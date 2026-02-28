import { gtWalsheim, PADDING_X_CLASS } from "@/shared/config";
import { cn } from "@/shared/utils";
import Image from "next/image";
import Link from "next/link";
import { LINES_POSITION } from "../config/lines.config";
import { LINK_BASE_CLASS } from "../config/link-classes";
import { FooterDocumentLink } from "./footer-document-link";
import { DOCUMENTS } from "../config/documents";

export const Footer = () => {
    return (
        <footer className={cn(PADDING_X_CLASS, "bg-[#242426] pt-15 pb-4")}>
            {/* Мобильная версия */}
            <div className="flex flex-col mob:hidden">
                <div className="pb-3 border-b border-white mb-6">
                    <Image
                        src={"/logo.svg"}
                        alt="logo"
                        width={1000}
                        height={1000}
                        className="w-full max-w-[200px] h-auto"
                        unoptimized
                        draggable={false}
                    />
                </div>
                <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex flex-col gap-1">
                        <Link
                            href="tel:+74957745434"
                            className={cn(
                                gtWalsheim.className,
                                "text-blue cursor-pointer font-medium text-base",
                            )}
                        >
                            +7 495 774-54-34
                        </Link>
                        <Link
                            href="mailto:krylov@omniton.ru"
                            className={cn(
                                gtWalsheim.className,
                                "text-blue cursor-pointer font-medium text-base",
                            )}
                        >
                            KRYLOV@OMNITON.RU
                        </Link>
                    </div>
                    <Image
                        src={"/sk.png"}
                        alt="sk"
                        width={133}
                        height={1000}
                        className="max-w-[100px] h-auto"
                        unoptimized
                        draggable={false}
                    />
                </div>
                <div className="h-px bg-[#B0B0B0] w-full mb-6" />
                <div className="flex flex-col gap-3 mb-6">
                    {DOCUMENTS.map((document) => (
                        <FooterDocumentLink
                            key={document.link}
                            {...document}
                            variant="mobile"
                        />
                    ))}
                </div>
            </div>

            {/* Таблет: контакты 24px, грид 4 колонки + картинка, gap 8px */}
            <div className="hidden mob:block lg:hidden">
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
                    <div className="relative w-[50%] pl-5 flex items-center">
                        <div className={cn(LINES_POSITION.bottom1)} />
                        <div className="flex flex-col">
                            <Link
                                href="tel:+74957745434"
                                className={cn(
                                    gtWalsheim.className,
                                    "text-blue cursor-pointer font-medium text-[24px] leading-tight",
                                )}
                            >
                                +7 (495) 774-54-34
                            </Link>
                            <Link
                                href="mailto:krylov@omniton.ru"
                                className={cn(
                                    gtWalsheim.className,
                                    "text-blue cursor-pointer font-medium text-[24px] leading-tight",
                                )}
                            >
                                krylov@omniton.ru
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-3.5 items-center">
                    {DOCUMENTS.map((document) => (
                        <FooterDocumentLink key={document.link} {...document} />
                    ))}
                    <Image
                        src={"/sk.png"}
                        alt="sk"
                        width={133}
                        height={1000}
                        className="max-w-[133px] h-auto justify-self-end"
                        unoptimized
                        draggable={false}
                    />
                </div>
            </div>

            {/* Десктоп — как было изначально */}
            <div className="hidden lg:block">
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
