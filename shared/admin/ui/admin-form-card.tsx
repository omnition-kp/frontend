import { AdminFormCardProps } from "../types";

export const AdminFormCard = ({ children }: AdminFormCardProps) => (
    <div className="p-5 bg-[#F9F9F9] border border-black/2 rounded-[4px] w-full">
        {children}
    </div>
);
