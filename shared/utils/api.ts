import axios from "axios";

/**
 * Базовый API-клиент. baseURL из NEXT_PUBLIC_API_HOST.
 */
export const $api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST,
});
