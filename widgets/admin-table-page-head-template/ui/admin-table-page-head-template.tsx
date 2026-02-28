import { AdminAddButton, AdminHeadline } from "@/shared/admin";
import { AdminTablePageHeadTemplateProps } from "../types/admin-table-page-head-template.props";

export const AdminTablePageHeadTemplate = ({
    title,
    link,
}: AdminTablePageHeadTemplateProps) => {
    return (
        <div className="flex items-center justify-between mb-7">
            <AdminHeadline title={title} />

            <AdminAddButton link={link}>Добавить</AdminAddButton>
        </div>
    );
};
