import { cn } from "@/shared/utils";
import { TABLE_HEADERS, COLUMN_WIDTHS } from "../config";
import { Title } from "@/shared/ui";

export function CalculationTableHeader() {
    return (
        <thead>
            <tr className="bg-[#D6D6D6] text-gray-800 border-b border-[#919191]">
                {TABLE_HEADERS.map((header, i) => (
                    <th
                        key={header}
                        className={cn(
                            "px-3 py-3 border-r border-[#919191] last:border-r-0 align-middle text-center",
                            COLUMN_WIDTHS[i],
                        )}
                    >
                        <Title variant="3" title={header} />
                    </th>
                ))}
            </tr>
        </thead>
    );
}
