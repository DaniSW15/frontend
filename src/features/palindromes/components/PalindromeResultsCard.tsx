import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ResultItem {
    word: string;
    palindrome: boolean;
}

interface PalindromeResultsCardProps {
    results: ResultItem[];
}

export const PalindromeResultsCard = ({ results }: PalindromeResultsCardProps) => {
    return (
        <Card className="p-5">
            <CardHeader>
                <CardTitle>Resultados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {results.map((res, idx) => (
                    <div
                        key={idx}
                        className="flex justify-between items-center p-3 rounded-lg border border-border bg-card"
                    >
                        <span className="font-semibold text-foreground">"{res.word}"</span>
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${res.palindrome
                                ? "bg-emerald-500/15 text-emerald-600"
                                : "bg-destructive/15 text-destructive"
                                }`}
                        >
                            {res.palindrome ? "Es Palíndromo" : "No es Palíndromo"}
                        </span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};
