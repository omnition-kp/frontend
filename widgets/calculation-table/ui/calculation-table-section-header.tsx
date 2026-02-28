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
            <td colSpan={4} className="px-3 py-3 text-right align-middle">
                <MainText variant="2" className="m-0 text-white">
                    Всего: {total}
                </MainText>
            </td>
            <td className="px-3 py-3 w-10 text-right align-middle">
                <ChevronDownIcon
                    className={cn(
                        "inline-block w-5 h-5 text-white transition-transform duration-300 ease-out",
                        isOpen && "rotate-180",
                    )}
                    aria-hidden
                />
            </td>
        </tr>
    );
}
