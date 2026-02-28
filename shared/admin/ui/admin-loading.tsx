import { Loader2 } from "lucide-react";

interface AdminLoadingProps {
    title?: string;
}

export const AdminLoading = ({
    title = "Загрузка данных...",
}: AdminLoadingProps) => {
    return (
        <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-[#4C4C4C]" />
            <p className="text-[16px] text-[#8C8C8C]">{title}</p>
        </div>
    );
};
