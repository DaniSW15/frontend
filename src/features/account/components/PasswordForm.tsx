import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { usePasswordForm } from "../hooks/usePasswordForm";

export const PasswordForm = () => {
    const { formData, errors, apiErrors, loading, handleChange, handleSubmit } = usePasswordForm();

    return (
        <Card className="shadow-md p-4">
            <CardHeader>
                <CardTitle>Actualizar Contraseña</CardTitle>
                <CardDescription>Cambia tu contraseña de acceso periódicamente por seguridad.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {apiErrors.length > 0 && (
                        <div className="bg-destructive/15 border border-destructive/30 text-destructive text-sm rounded-lg p-3">
                            {apiErrors.map((err, idx) => <p key={idx}>{err}</p>)}
                        </div>
                    )}

                    <div className="space-y-1">
                        <Label htmlFor="current_password">Contraseña Actual</Label>
                        <Input id="current_password" type="password" name="current_password" value={formData.current_password} onChange={handleChange} aria-invalid={!!errors.current_password} />
                        {errors.current_password && <p className="text-xs text-destructive">{errors.current_password}</p>}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="new_password">Nueva Contraseña</Label>
                        <Input id="new_password" type="password" name="new_password" value={formData.new_password} onChange={handleChange} aria-invalid={!!errors.new_password} />
                        {errors.new_password && <p className="text-xs text-destructive">{errors.new_password}</p>}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="password_confirmation">Confirmar Nueva Contraseña</Label>
                        <Input id="password_confirmation" type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} aria-invalid={!!errors.password_confirmation} />
                        {errors.password_confirmation && <p className="text-xs text-destructive">{errors.password_confirmation}</p>}
                    </div>

                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? "Actualizando..." : "Actualizar Contraseña"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};
