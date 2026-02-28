import { cn } from "@/shared/utils";
import { ButtonProps } from "../types";
import { gtWalsheim } from "@/shared/config";
import { Loader2 } from "lucide-react";

export const Button = ({
    children,
    className,
    loading,
    disabled,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={cn(
                gtWalsheim.className,
                "text-[20px] leading-[100%] tracking-[0%] font-medium",
                "py-3 px-15",
                "bg-gray text-white",
                "transition-all duration-300 ease-in-out",
                "cursor-pointer",
                "hover:bg-gray/30 hover:text-black",
                className,
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                <>{children}</>
            )}
        </button>
    );
};
