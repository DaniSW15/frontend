import { useState } from "react";
import { palindromeApi } from "../services/palindromeApi";

export const usePalindromeChecker = () => {
    const [palindromeInput, setPalindromeInput] = useState("");
    const [palindromeResults, setPalindromeResults] = useState<{ word: string; palindrome: boolean }[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCheck = async () => {
        setError("");
        setPalindromeResults([]);

        const words = palindromeInput
            .split(",")
            .map(w => w.trim())
            .filter(w => w.length > 0);

        if (words.length < 3) {
            setError("Debes ingresar al menos 3 palabras o frases separadas por comas.");
            return;
        }

        setLoading(true);
        try {
            const results = await palindromeApi.checkPalindromes(words);
            setPalindromeResults(results);
        } catch (err: any) {
            setError(err.response?.data?.error || "Error al realizar la consulta.");
        } finally {
            setLoading(false);
        }
    };

    return {
        palindromeInput,
        setPalindromeInput,
        palindromeResults,
        error,
        loading,
        handleCheck
    };
};
