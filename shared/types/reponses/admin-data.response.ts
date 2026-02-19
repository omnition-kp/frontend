export interface AdminDataResponse {
    id: number;
    email: string;
    name: string;
    role: "ADMIN" | "MODERATOR";
}
