export interface ParallelItemProps {
    title: string;
    icon: React.ReactNode;
    /** Ширина полоски в квадратах (1 квадрат = 32px) */
    widthSquares: number;
    /** Вариант: светлая полоска или тёмная */
    variant?: "default" | "dark";
    /** Смещение от начала в квадратах (0 = у оси, 1 квадрат = 32px) */
    startSquares: number;
}
