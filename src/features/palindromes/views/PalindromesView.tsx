import { PalindromeInputCard } from "../components/PalindromeInputCard";
import { PalindromeResultsCard } from "../components/PalindromeResultsCard";
import { usePalindromeChecker } from "../hooks/usePalindromeChecker";

export const PalindromesView = () => {
    const {
        palindromeInput,
        setPalindromeInput,
        palindromeResults,
        error,
        loading,
        handleCheck
    } = usePalindromeChecker();

    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Verificador de Palíndromos</h1>
                <p className="text-muted-foreground text-sm">
                    Ingresa palabras o frases para comprobar si se leen igual de izquierda a derecha.
                </p>
            </div>

            <PalindromeInputCard
                value={palindromeInput}
                onChange={setPalindromeInput}
                onError={error}
                onSubmit={handleCheck}
                loading={loading}
            />

            {palindromeResults.length > 0 && (
                <PalindromeResultsCard results={palindromeResults} />
            )}
        </div>
    );
};
