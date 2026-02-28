import { AdminKpForm } from "@/features/admin-kp-form";

export default async function CreateKpPage({
    params,
}: {
    params: Promise<{
        id: string;
    }>;
}) {
    const { id } = await params;

    return <AdminKpForm type="create" clientId={id} />;
}
