import { createElement } from "react";
import {
    FileCheckIcon,
    FileTextIcon,
    HammerIcon,
    PaintRollerIcon,
    PalleteRoundIcon,
    SchockAbsorberIcon,
    TimeIcon,
} from "../icons/icons";
import { ParallelItemProps } from "../types/parallel-item.props";

export const PARALLEL_ITEMS: ParallelItemProps[] = [
    {
        title: "Создание образца",
        icon: createElement(FileTextIcon),
        widthSquares: 3,
        variant: "default",
        startSquares: 0,
    },
    {
        title: "Заключение договора",
        icon: createElement(FileCheckIcon),
        widthSquares: 3,
        variant: "default",
        startSquares: 3,
    },
    {
        title: "Утверждение принципиальных решений",
        icon: createElement(PalleteRoundIcon),
        widthSquares: 6,
        variant: "dark",
        startSquares: 0,
    },
    {
        title: "Устройство композитного основания",
        icon: createElement(HammerIcon),
        widthSquares: 3,
        variant: "default",
        startSquares: 6,
    },
    {
        title: "Технологический перерыв на потерю влажности",
        icon: createElement(TimeIcon),
        widthSquares: 3,
        variant: "default",
        startSquares: 9,
    },
    {
        title: "Цикл основных работ по устройству финишной поверхности",
        icon: createElement(SchockAbsorberIcon),
        widthSquares: 3,
        variant: "default",
        startSquares: 6,
    },
    {
        title: "Производство основного материала",
        icon: createElement(PaintRollerIcon),
        widthSquares: 6,
        variant: "dark",
        startSquares: 12,
    },
];
