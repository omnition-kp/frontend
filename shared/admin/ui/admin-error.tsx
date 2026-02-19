import type { AdminErrorProps } from "../types";

export const AdminError = ({ error }: AdminErrorProps) => {
    return (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm font-medium mb-5">
            {error}
        </div>
    );
};
