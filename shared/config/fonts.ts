import { Onest as OnestFont } from "next/font/google";
import localFont from "next/font/local";

export const onest = OnestFont({
    subsets: ["latin", "cyrillic"],
    display: "swap",
});

export const gtWalsheim = localFont({
    src: [
        {
            path: "../../public/fonts/gtwalsheimpro_condensedmedium.otf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/gtwalsheimpro_condensedmediumoblique.otf",
            weight: "500",
            style: "italic",
        },
    ],
    display: "swap",
});
