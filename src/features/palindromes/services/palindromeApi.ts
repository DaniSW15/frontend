import api from "@/services/api";

export const palindromeApi = {
    checkPalindromes: async (words: string[]) => {
        const response = await api.post("/palindrome/check", { words });
        return response.data.results;
    },
}