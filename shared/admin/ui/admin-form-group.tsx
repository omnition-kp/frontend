import { cn } from "@/shared/utils";
import type { AdminFormGroupProps } from "../types";
import { AdminMainText } from "./admin-main-text";

export const AdminFormGroup = ({
    title,
    children,
    className,
    childrenClassName,
    ...props
}: AdminFormGroupProps) => (
    <div className={cn("bg-white rounded-[4px] p-4 ", className)} {...props}>
        {title && (
            <AdminMainText variant="2" className="mb-5">
                {title}
            </AdminMainText>
        )}

        <div className={childrenClassName}>{children}</div>
    </div>
);
