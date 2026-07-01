import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface PalindromeInputCardProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    loading: boolean;
    onError: string;
}

export const PalindromeInputCard = ({
    value,
    onChange,
    onSubmit,
    loading,
    onError
}: PalindromeInputCardProps) => {
    return (
        <Card className="shadow-md p-4">
            <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                        Palabras (separadas por comas)
                    </label>
                    <Input
                        value={value} // 1. Vinculamos al valor de la prop
                        onChange={(e) => onChange(e.target.value)} // 2. Notificamos el cambio al hook
                        placeholder="Ej: ana, reconocer, perro, radar, luz azul"
                        disabled={loading}
                    />
                    {/* 3. Mostramos el error que viene desde el hook */}
                    {onError && <p className="text-xs text-destructive">{onError}</p>}
                </div>
                {/* 4. Ejecutamos la función de envío y manejamos el estado de carga */}
                <Button
                    onClick={onSubmit}
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? "Verificando..." : "Verificar Palíndromos"}
                </Button>
            </CardContent>
        </Card>
    );
};