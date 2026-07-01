import { ProfileInfoForm } from "../components/ProfileInfoForm";
import { PasswordForm } from "../components/PasswordForm";

export const AccountView = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Configuración de Cuenta</h1>
                <p className="text-muted-foreground text-sm">Administra tus datos personales y actualiza tus credenciales de acceso.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProfileInfoForm />
                <PasswordForm />
            </div>
        </div>
    );
};
