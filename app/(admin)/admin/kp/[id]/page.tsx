import { AdminKpForm } from "@/features/admin-kp-form/ui/admin-kp-form";

export default async function KpPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { id } = await params;

    const resolvedSearchParams = await searchParams;
    const clientId = Number(resolvedSearchParams.clientId);

    return <AdminKpForm type="update" id={id} clientId={Number(clientId)} />;
}
