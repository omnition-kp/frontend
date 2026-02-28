"use client";

import { useLoaderAnimation } from "../lib/use-loader-animation";
import { LoaderLogo } from "./loader-logo";
import { LoaderProgressBar } from "./loader-progress-bar";

export const Loader = () => {
    const { width, x, translateX } = useLoaderAnimation();

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <LoaderLogo width={width} x={x} translateX={translateX} />
            <LoaderProgressBar width={width} x={x} />
        </div>
    );
};
