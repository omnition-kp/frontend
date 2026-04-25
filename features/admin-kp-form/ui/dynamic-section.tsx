import { AdminFormGroup, AdminInput } from "@/shared/admin";
import { onest } from "@/shared/config";
import { cn } from "@/shared/utils";
import { Trash2, PlusIcon } from "lucide-react";
import { DynamicItem } from "../types";

export const DynamicSection = ({
    title,
    items,
    setItems,
    maxLength = 100,
}: {
    title: string;
    items: DynamicItem[];
    setItems: React.Dispatch<React.SetStateAction<DynamicItem[]>>;
    maxLength?: number;
}) => {
    const handleAdd = () => {
        const newId =
            items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
        setItems([...items, { id: newId, value: "" }]);
    };

    const handleRemove = (id: number) => {
        setItems(items.filter((i) => i.id !== id));
    };

    const handleChange = (id: number, newValue: string) => {
        setItems(
            items.map((i) => (i.id === id ? { ...i, value: newValue } : i)),
        );
    };

    return (
        <AdminFormGroup title={title}>
            <div className="flex flex-col gap-2.5">
                {items.map((item) => (
                    <div key={item.id} className="relative group">
                        <AdminInput
                            value={item.value}
                            onChange={(e) =>
                                handleChange(item.id, e.target.value)
                            }
                            placeholder="Описание"
                            variant="alternative"
                            maxLength={maxLength}
                            // Оставляем место справа под иконку/счетчик
                            className="pr-[40px]"
                        />

                        {/* Правый блок: иконка и счетчик центрируются по высоте контейнера */}
                        <div className="absolute inset-y-0 right-3 flex flex-col items-center justify-center gap-1">
                            <button
                                type="button"
                                onClick={() => handleRemove(item.id)}
                                className="text-black/20 hover:text-red-500 transition-colors cursor-pointer"
                                title="Удалить"
                            >
                                <Trash2 width={16} height={16} />
                            </button>
                            <div className="text-[10px] leading-none text-black/30 select-none">
                                {item.value.length}/{maxLength}
                            </div>
                        </div>
                    </div>
                ))}

                <div className="w-full flex justify-end pt-1">
                    <button
                        type="button"
                        onClick={handleAdd}
                        className={cn(
                            onest.className,
                            "flex items-center gap-1 text-[14px] leading-[90%] tracking-[0%] text-black cursor-pointer hover:opacity-70 transition-opacity",
                        )}
                    >
                        Добавить поле
                        <PlusIcon width={12} height={12} />
                    </button>
                </div>
            </div>
        </AdminFormGroup>
    );
};
