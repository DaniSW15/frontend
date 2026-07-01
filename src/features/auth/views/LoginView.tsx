import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useLoginForm } from "../hooks/useLoginForm";

export const LoginView = () => {
    const { formData, errors, apiError, loading, handleChange, handleSubmit } = useLoginForm();

    return (
        <div className="flex justify-center items-center min-h-screen bg-background px-4">
            <Card className="w-full max-w-md shadow-lg p-5">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
                    <CardDescription className="text-center">
                        Ingresa tus credenciales para acceder al panel de administración
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {apiError && (
                            <div className="bg-destructive/15 border border-destructive/30 text-destructive text-sm rounded-lg p-3">
                                {apiError}
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
                                disabled={loading}
                            />
                            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium">Contraseña</label>
                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="********"
                                aria-invalid={!!errors.password}
                                disabled={loading}
                            />
                            {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                        </div>

                        <Button type="submit" className="w-full mt-2" disabled={loading}>
                            {loading ? "Iniciando..." : "Iniciar Sesión"}
                        </Button>

                        <div className="text-center text-sm text-muted-foreground mt-4 space-y-2 flex flex-col">
                            <p>
                                ¿No tienes una cuenta?{" "}
                                <Link to="/register" className="text-primary hover:underline font-medium">
                                    Regístrate aquí
                                </Link>
                            </p>
                            <p>
                                <Link to="/forgot-password" className="text-primary hover:underline font-medium">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
