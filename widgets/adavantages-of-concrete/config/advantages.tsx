import { NumberText } from "@/shared/ui";
import { AdvantageBlockProps } from "../types/advantage-block.props";
import { ThermomentrIcon } from "../icons/icons";
import Image from "next/image";
import { cn } from "@/shared/utils";

const adaptation_class_for_number =
    "lg:text-[80px] mob:text-[60px] text-[55px]";

export const ADVANTAGES: AdvantageBlockProps[] = [
    {
        title: "Натуральность",
        description:
            "Выбросов CO₂, что меньше цемента и электроэнергии. За счет формулы смеси OMNITON подходит для зелёных стандартов BREEAM, LEED",
        children: (
            <NumberText
                title="-40%"
                className={cn("text-gray", adaptation_class_for_number)}
            />
        ),
        icon: "/advantages-of-conrete/icon.png",
        leftBorder: true,
        rightBorder: true,
        topBorder: true,
        bottomBorder: true,
    },
    {
        title: "Высокая прочность (B50)",
        description:
            "Имеет подтвержденный опыт по созданию специализированных высокопробных бетонов",
        children: (
            <NumberText
                title="B40-B100"
                className={cn("text-gray", adaptation_class_for_number)}
            />
        ),
        leftBorder: false,
        rightBorder: true,
        topBorder: true,
        bottomBorder: true,
    },
    {
        title: "ИЗНОСОСТОЙКОСТЬ И РЕНОВИРУЕМОСТь",
        description:
            "Имеет подтвержденный опыт по созданию специализированных высокопробных бетонов",
        children: (
            <NumberText
                title="до 50 лет"
                className={cn("text-gray", adaptation_class_for_number)}
            />
        ),
        leftBorder: false,
        rightBorder: true,
        topBorder: true,
        bottomBorder: true,
    },
    {
        title: "Устойчивость к среде",
        description:
            "Высокая водонепроницаемость позволяет использовать OMNITON как в интерьере, так и в экстерьере",
        children: <ThermomentrIcon />,
        leftBorder: true,
        rightBorder: true,
        bottomBorder: true,
        topBorder: false,
    },
    {
        title: "цельная окраска",
        description:
            "Цвет не стирается десятилетиями даже при шлифовке, ведь мы красим всё тело материала, а не верхний слой",
        children: (
            <Image
                src="/advantages-of-conrete/icon-2.png"
                alt="цельная окраска"
                width={70}
                height={70}
                className="w-[70px] h-[70px]"
            />
        ),
        leftBorder: false,
        rightBorder: true,
        bottomBorder: true,
        topBorder: false,
    },
    {
        title: "ТЕХНОЛОГИЯ МНОГОКОМПОНЕНТНОСТИ",
        description:
            "КОМПОНЕНТОВ формула дает тот результат по составу, прочности, внешнему виду, который нужен",
        children: (
            <NumberText
                title="<12"
                className={cn("text-gray", adaptation_class_for_number)}
            />
        ),
        leftBorder: false,
        rightBorder: true,
        bottomBorder: true,
        topBorder: false,
    },
];
