import { Kp } from "@/page/kp";

export default async function KpPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <Kp id={id} />;
}
