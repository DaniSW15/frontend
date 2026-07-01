import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProfile } from "../hooks/useProfileForm";

export const ProfileInfoForm = () => {
    const { user, setUser } = useContext(AuthContext);

    const { formData, errors, apiErrors, loading, handleChange, handleSubmit } = useProfile({ user, setUser });

    return (
        <Card className="shadow-md p-4">
            <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>Mantén tus datos de contacto y facturación actualizados.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {apiErrors.length > 0 && (
                        <div className="bg-destructive/15 border border-destructive/30 text-destructive text-sm rounded-lg p-3">
                            {apiErrors.map((err, idx) => <p key={idx}>{err}</p>)}
                        </div>
                    )}
                    <div className="space-y-1">
                        <Label htmlFor="profile-name">Nombre Completo</Label>
                        <Input id="profile-name" name="name" value={formData.name} onChange={handleChange} aria-invalid={!!errors.name} />
                        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="profile-email">Correo Electrónico</Label>
                        <Input id="profile-email" type="email" name="email" value={formData.email} onChange={handleChange} aria-invalid={!!errors.email} />
                        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="profile-rfc">RFC</Label>
                        <Input id="profile-rfc" name="rfc" value={formData.rfc} onChange={handleChange} aria-invalid={!!errors.rfc} />
                        {errors.rfc && <p className="text-xs text-destructive">{errors.rfc}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="profile-address">Dirección</Label>
                        <Input id="profile-address" name="address" value={formData.address} onChange={handleChange} aria-invalid={!!errors.address} />
                        {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="profile-phone">Teléfono</Label>
                        <Input id="profile-phone" name="phone" value={formData.phone} onChange={handleChange} aria-invalid={!!errors.phone} />
                        {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="profile-website">Sitio Web</Label>
                        <Input id="profile-website" name="website" value={formData.website} onChange={handleChange} aria-invalid={!!errors.website} />
                        {errors.website && <p className="text-xs text-destructive">{errors.website}</p>}
                    </div>
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? "Guardando..." : "Guardar Cambios"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}