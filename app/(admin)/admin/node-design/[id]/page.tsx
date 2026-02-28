import { AdminNodeDesignForm } from "@/features/admin-node-design-form";

interface NodeDesignEditPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function NodeDesignEditPage({
    params,
}: NodeDesignEditPageProps) {
    const { id } = await params;

    return <AdminNodeDesignForm type="update" id={id} />;
}
