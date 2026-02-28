import Link from "next/link";
import { FooterDocumentLinkProps } from "../types/footer-document-link.props";
import { cn } from "@/shared/utils";
import { gtWalsheim } from "@/shared/config";

export const FooterDocumentLink = ({
    link,
    title,
}: FooterDocumentLinkProps) => {
    return (
        <Link
            href={link}
            target="_blank"
            className={cn(
                gtWalsheim.className,
                "text-[#B0B0B0] font-medium transition duration-300 ease-in-out hover:text-white cursor-pointer",
            )}
        >
            {title}
        </Link>
    );
};
