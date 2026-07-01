import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useRegisterForm } from "../hooks/useRegisterForm";

export const RegisterView = () => {
    const { formData, errors, apiErrors, loading, handleChange, handleSubmit } = useRegisterForm();

    return (
        <div className="flex items-center justify-center min-h-screen bg-background px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Registrar Cuenta</CardTitle>
                    <CardDescription className="text-center">
                        Crea una cuenta para comenzar a gestionar tus colaboradores
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 p-4">
                        {apiErrors.length > 0 && (
                            <div className="bg-destructive/15 border border-destructive/30 text-destructive text-sm rounded-lg p-3 space-y-1">
                                {apiErrors.map((err, idx) => (
                                    <p key={idx}>{err}</p>
                                ))}
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-sm font-medium">Nombre</label>
                            <Input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Tu nombre completo"
                                aria-invalid={!!errors.name}
                                disabled={loading}
                            />
                            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium">Correo Electrónico</label>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="tu@correo.com"
                                aria-invalid={!!errors.email}
                                disabled={loading}
                            />
                            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium">RFC</label>
                            <Input
                                type="text"
                                name="rfc"
                                value={formData.rfc}
                                onChange={handleChange}
                                placeholder="ABCD123456XYZ"
                                aria-invalid={!!errors.rfc}
                                disabled={loading}
                            />
                            {errors.rfc && <p className="text-xs text-destructive">{errors.rfc}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium">Contraseña</label>
                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                aria-invalid={!!errors.password}
                                disabled={loading}
                            />
                            {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium">Confirmar Contraseña</label>
                            <Input
                                type="password"
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                placeholder="••••••••"
                                aria-invalid={!!errors.password_confirmation}
                                disabled={loading}
                            />
                            {errors.password_confirmation && (
                                <p className="text-xs text-destructive">{errors.password_confirmation}</p>
                            )}
                        </div>

                        <Button type="submit" className="w-full mt-2" disabled={loading}>
                            {loading ? "Registrando..." : "Registrarse"}
                        </Button>

                        <div className="text-center text-sm text-muted-foreground mt-4">
                            ¿Ya tienes una cuenta?{" "}
                            <Link to="/login" className="text-primary hover:underline font-medium">
                                Inicia sesión aquí
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
