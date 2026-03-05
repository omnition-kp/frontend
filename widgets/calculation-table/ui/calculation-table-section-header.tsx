import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/shared/utils";
import { MainText } from "@/shared/ui";

export type CalculationTableSectionHeaderProps = {
    name: string;
    total: string;
    isOpen: boolean;
    onToggle: () => void;
};

export function CalculationTableSectionHeader({
    name,
    total,
    isOpen,
    onToggle,
}: CalculationTableSectionHeaderProps) {
    return (
        <tr
            role="button"
            tabIndex={0}
            onClick={onToggle}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onToggle();
                }
            }}
            className="bg-[#919191] text-white cursor-pointer hover:opacity-90 transition-opacity"
        >
            <td colSpan={4} className="px-3 py-3 text-left align-middle">
                <MainText variant="2" className="m-0 text-white">
                    {name}
                </MainText>
            </td>
            <td colSpan={5} className="px-3 py-3 w-10 text-right align-middle">
                <div className="flex items-center justify-end gap-4">
                    <MainText variant="2" className="m-0 text-white">
                        Всего: {total}
                    </MainText>
                    <ChevronDownIcon
                        className={cn(
                            "inline-block w-5 h-5 text-white transition-transform duration-300 ease-out",
                            isOpen && "rotate-180",
                        )}
                        aria-hidden
                    />
                </div>
            </td>
        </tr>
    );
}
