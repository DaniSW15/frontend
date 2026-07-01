import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSubUserForm } from "../hooks/useSubUserForm";

interface SubUserFormProps {
    initialData?: any;
    onSuccess: () => void;
    onCancel: () => void;
}

export const SubUserForm = ({ initialData, onSuccess, onCancel }: SubUserFormProps) => {
    const isEdit = !!initialData?.id;
    const { formData, errors, apiErrors, loading, handleChange, handleSubmit } = useSubUserForm({
        initialData,
        onSuccess
    });

    return (
        <Card className="shadow-lg p-4">
            <CardHeader className="mb-4">
                <CardTitle>{isEdit ? "Editar Sub-usuario" : "Registrar Sub-usuario"}</CardTitle>
                <CardDescription>
                    {isEdit ? "Modifica los datos del sub-usuario. Las contraseñas son opcionales." : "Ingresa los datos para registrar un nuevo sub-usuario administrativo."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {apiErrors.length > 0 && (
                        <div className="bg-destructive/15 border border-destructive/30 text-destructive text-sm rounded-lg p-3">
                            {apiErrors.map((err, idx) => <p key={idx}>{err}</p>)}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="name">Nombre Completo</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} aria-invalid={!!errors.name} />
                            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} aria-invalid={!!errors.email} />
                            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="rfc">RFC</Label>
                            <Input id="rfc" name="rfc" value={formData.rfc} onChange={handleChange} aria-invalid={!!errors.rfc} />
                            {errors.rfc && <p className="text-xs text-destructive">{errors.rfc}</p>}
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} aria-invalid={!!errors.phone} />
                            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="website">Sitio Web</Label>
                            <Input id="website" name="website" value={formData.website} onChange={handleChange} aria-invalid={!!errors.website} />
                            {errors.website && <p className="text-xs text-destructive">{errors.website}</p>}
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="address">Dirección</Label>
                            <Input id="address" name="address" value={formData.address} onChange={handleChange} aria-invalid={!!errors.address} />
                            {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="password">Contraseña {isEdit && "(Opcional)"}</Label>
                            <Input id="password" type="password" name="password" value={formData.password} onChange={handleChange} aria-invalid={!!errors.password} placeholder={isEdit ? "Dejar en blanco para no cambiar" : "********"} />
                            {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="password_confirmation">Confirmar Contraseña</Label>
                            <Input id="password_confirmation" type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} aria-invalid={!!errors.password_confirmation} placeholder="********" />
                            {errors.password_confirmation && <p className="text-xs text-destructive">{errors.password_confirmation}</p>}
                        </div>
                    </div>

                    <div className="flex gap-2 justify-end mt-4">
                        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Guardando..." : "Guardar"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};
