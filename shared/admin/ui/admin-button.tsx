import { cn } from "@/shared/utils";
import { AdminButtonProps } from "../types";
import { onest } from "@/shared/config";
import { BUTTON_CLASS } from "../config/button-class";
import { Loader2 } from "lucide-react";

export const AdminButton = ({
    children,
    loading,
    variant = "primary",
    className,
    disabled,
    ...props
}: AdminButtonProps) => {
    return (
        <button
            className={cn(
                onest.className,
                "font-medium text-[16px] leading-[100%] tracking-[0%] transition-all duration-300 ease-in-out border rounded-[4px] px-8.5 py-1.5",
                loading ? "cursor-wait" : "cursor-pointer",
                disabled ? "opacity-50 cursor-not-allowed" : "",
                BUTTON_CLASS[variant],
                className,
            )}
            disabled={loading || disabled}
            {...props}
        >
            {loading ? (
                <div className="w-full flex items-center justify-center">
                    <Loader2
                        className={cn(
                            "w-4 h-4 animate-spin",
                            variant === "primary" ? "text-white" : "text-gray",
                        )}
                    />
                </div>
            ) : (
                children
            )}
        </button>
    );
};
