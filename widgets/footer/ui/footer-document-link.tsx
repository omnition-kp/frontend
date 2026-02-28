import Link from "next/link";
import { FooterDocumentLinkProps } from "../types/footer-document-link.props";
import { cn } from "@/shared/utils";
import { gtWalsheim } from "@/shared/config";

export const FooterDocumentLink = ({
    link,
    title,
    variant = "default",
}: FooterDocumentLinkProps) => {
    return (
        <Link
            href={link}
            target="_blank"
            className={cn(
                gtWalsheim.className,
                "font-medium transition duration-300 ease-in-out hover:text-white cursor-pointer",
                variant === "mobile" ? "text-[#6B6B6B]" : "text-[#B0B0B0]",
            )}
        >
            {title}
        </Link>
    );
};
