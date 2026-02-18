export const BUTTON_CLASS = {
    primary: "bg-gray border-gray text-white hover:bg-[#424242/40] text-white",
    secondary:
        "bg-transparent border-gray text-gray hover:bg-gray hover:text-black",
} as const;

export type ButtonVariant = keyof typeof BUTTON_CLASS;
