import { AdminManagerForm } from "@/features/admin-manager-form";

interface ManagerEditPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ManagerEditPage({
    params,
}: ManagerEditPageProps) {
    const { id } = await params;

    return <AdminManagerForm type="update" id={id} />;
}
