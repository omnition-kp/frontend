import { Golos_Text, Onest as OnestFont } from "next/font/google";
import localFont from "next/font/local";

export const onest = OnestFont({
    subsets: ["latin", "cyrillic"],
    display: "swap",
});

export const golos = Golos_Text({
    subsets: ["latin", "cyrillic"],
    display: "swap",
});

export const gtWalsheim = localFont({
    src: [
        {
            path: "../../public/fonts/GT-Walsheim-Pro-Medi.woff",
            weight: "500",
            style: "normal",
        },
        // Standard
        // {
        //     path: "../../public/fonts/GTWalsheimPro-Thin.woff2",
        //     weight: "100",
        //     style: "normal",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-ThinOblique.woff2",
        //     weight: "100",
        //     style: "italic",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-UltraLight.woff2",
        //     weight: "200",
        //     style: "normal",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-UltraLightOblique.woff2",
        //     weight: "200",
        //     style: "italic",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-Light.woff2",
        //     weight: "300",
        //     style: "normal",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-LightOblique.woff2",
        //     weight: "300",
        //     style: "italic",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-Regular.woff2",
        //     weight: "400",
        //     style: "normal",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-RegularOblique.woff2",
        //     weight: "400",
        //     style: "italic",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-Medium.woff2",
        //     weight: "500",
        //     style: "normal",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-MediumOblique.woff2",
        //     weight: "500",
        //     style: "italic",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-Bold.woff2",
        //     weight: "700",
        //     style: "normal",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-BoldOblique.woff2",
        //     weight: "700",
        //     style: "italic",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-UltraBold.woff2",
        //     weight: "800",
        //     style: "normal",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-UltraBoldOblique.woff2",
        //     weight: "800",
        //     style: "italic",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-Black.woff2",
        //     weight: "900",
        //     style: "normal",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-BlackOblique.woff2",
        //     weight: "900",
        //     style: "italic",
        // },
        // // Condensed
        // {
        //     path: "../../public/fonts/GTWalsheimPro-CondensedThin.woff2",
        //     weight: "100",
        //     style: "normal",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-CondensedThinOblique.woff2",
        //     weight: "100",
        //     style: "italic",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-CondensedUltraLight.woff2",
        //     weight: "200",
        //     style: "normal",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-CondensedUltraLightOblique.woff2",
        //     weight: "200",
        //     style: "italic",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-CondensedLight.woff2",
        //     weight: "300",
        //     style: "normal",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-CondensedLightOblique.woff2",
        //     weight: "300",
        //     style: "italic",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-CondensedRegular.woff2",
        //     weight: "400",
        //     style: "normal",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-CondensedRegularOblique.woff2",
        //     weight: "400",
        //     style: "italic",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-CondensedMedium.woff2",
        //     weight: "500",
        //     style: "normal",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-CondensedMediumOblique.woff2",
        //     weight: "500",
        //     style: "italic",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-CondensedBold.woff2",
        //     weight: "700",
        //     style: "normal",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-CondensedBoldOblique.woff2",
        //     weight: "700",
        //     style: "italic",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-CondensedUltraBold.woff2",
        //     weight: "800",
        //     style: "normal",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-CondensedUltraBoldOblique.woff2",
        //     weight: "800",
        //     style: "italic",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-CondensedBlack.woff2",
        //     weight: "900",
        //     style: "normal",
        // },
        // {
        //     path: "../../public/fonts/GTWalsheimPro-CondensedBlackOblique.woff2",
        //     weight: "900",
        //     style: "italic",
        // },
    ],
    display: "swap",
});
