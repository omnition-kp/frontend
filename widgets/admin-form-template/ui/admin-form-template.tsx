import { BUTTON_CLASS } from "../config/button-class";
import { AdminFormTemplateProps } from "../types/admin-form-template.props";
import {
    AdminButton,
    AdminFormCard,
    AdminHeadlineForm,
    AdminLoading,
} from "@/shared/admin";

export const AdminFormTemplate = ({
    children,
    title,
    onCancel,
    onSuccess,
    loading,
    dataLoading,
}: AdminFormTemplateProps) => {
    if (dataLoading) {
        return <AdminLoading title="Загрузка данных..." />;
    }

    return (
        <AdminFormCard>
            <div>
                <div className="mb-9 flex items-center justify-between">
                    <AdminHeadlineForm title={title} />

                    <div className="grid grid-cols-2 gap-2">
                        <AdminButton
                            variant="secondary"
                            className={BUTTON_CLASS}
                            onClick={onCancel}
                            disabled={loading}
                        >
                            Отмена
                        </AdminButton>

                        <AdminButton
                            className={BUTTON_CLASS}
                            onClick={onSuccess}
                            loading={loading}
                        >
                            Сохранить
                        </AdminButton>
                    </div>
                </div>

                {children}
            </div>
        </AdminFormCard>
    );
};
