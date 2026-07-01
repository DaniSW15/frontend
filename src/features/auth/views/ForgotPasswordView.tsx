import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useForgotPasswordForm } from "../hooks/useForgotPasswordForm";

export const ForgotPasswordView = () => {
    const {
        formData,
        errors,
        apiError,
        successMessage,
        loading,
        handleChange,
        handleSubmit
    } = useForgotPasswordForm();

    return (
        <div className="flex items-center justify-center min-h-screen bg-background px-4">
            <Card className="w-full max-w-md shadow-lg p-5">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Restablecer Contraseña</CardTitle>
                    <CardDescription className="text-center">
                        Ingresa tus datos registrados para cambiar tu contraseña
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {apiError && (
                            <div className="bg-destructive/15 border border-destructive/30 text-destructive text-sm rounded-lg p-3">
                                {apiError}
                            </div>
                        )}

                        {successMessage && (
                            <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 text-sm rounded-lg p-3">
                                {successMessage} Redirigiendo al login...
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-sm font-medium">Correo Electrónico</label>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="tu@correo.com"
                                aria-invalid={!!errors.email}
                                disabled={loading || !!successMessage}
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
                                disabled={loading || !!successMessage}
                            />
                            {errors.rfc && <p className="text-xs text-destructive">{errors.rfc}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium">Nueva Contraseña</label>
                            <Input
                                type="password"
                                name="new_password"
                                value={formData.new_password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                aria-invalid={!!errors.new_password}
                                disabled={loading || !!successMessage}
                            />
                            {errors.new_password && <p className="text-xs text-destructive">{errors.new_password}</p>}
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
                                disabled={loading || !!successMessage}
                            />
                            {errors.password_confirmation && (
                                <p className="text-xs text-destructive">{errors.password_confirmation}</p>
                            )}
                        </div>

                        <Button type="submit" className="w-full mt-2" disabled={loading || !!successMessage}>
                            {loading ? "Procesando..." : "Restablecer Contraseña"}
                        </Button>

                        <div className="text-center text-sm text-muted-foreground mt-4">
                            ¿Recordaste tu contraseña?{" "}
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
