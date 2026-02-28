/**
 * EN: Normalizes a phone number by removing all non-digit characters
 * RU: Нормализует номер телефона, удаляя все нецифровые символы
 *
 * @example
 * normalizePhone("+7 (916) 234-56-78") // "+79162345678"
 * normalizePhone("+7 (916) 234-56-78") // "+79162345678"
 *
 * @param phone - Phone number to normalize
 * @returns Normalized phone number
 */
export const normalizePhone = (phone: string) => {
    return phone.replace(/[^\d]/g, "");
};
