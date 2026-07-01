import { useEffect, useState } from "react";
import { subUserApi } from "../services/subUserApi";
import { SubUserForm } from "../components/SubUserForm";
import { Button } from "@/components/ui/button";
import { SubUserTable } from "../components/SubUserTable";
import { toast } from "sonner";

interface SubUser {
    id: number;
    name: string;
    email: string;
    rfc: string;
    address: string;
    phone: string;
    website: string;
}

export const SubUsersView = () => {
    const [subUsers, setSubUsers] = useState<SubUser[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingSubUserId, setEditingSubUserId] = useState<number | null>(null);

    useEffect(() => {
        fetchSubUsers();
    }, []);

    const fetchSubUsers = async () => {
        try {
            const data = await subUserApi.getSubUsers();
            setSubUsers(data);
        } catch (err) {
            console.error("Error cargando sub-usuarios", err);
            toast.error("Error al cargar los sub-usuarios.");
        }
    };

    const handleEditSubUser = (id: number) => {
        setEditingSubUserId(id);
        setShowForm(true);
    };

    const handleDeleteSubUser = async (id: number) => {
        try {
            await subUserApi.deleteSubUser(id);
            toast.success("Sub-usuario eliminado correctamente.");
            fetchSubUsers();
        } catch (err: any) {
            console.error("Error eliminando sub-usuario", err);
            toast.error(err.response?.data?.error || "Error al eliminar el sub-usuario.");
        }
    };

    const handleSuccess = () => {
        fetchSubUsers();
        setShowForm(false);
        setEditingSubUserId(null);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingSubUserId(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Usuarios</h1>
                    <p className="text-muted-foreground text-sm">Administración de cuentas con acceso administrativo secundario.</p>
                </div>
                {!showForm && (
                    <Button onClick={() => setShowForm(true)}>+ Agregar Usuario</Button>
                )}
            </div>

            {showForm ? (
                <SubUserForm
                    initialData={editingSubUserId ? subUsers.find(u => u.id === editingSubUserId) : undefined}
                    onSuccess={handleSuccess}
                    onCancel={handleCancel}
                />
            ) : (
                <SubUserTable
                    subUsers={subUsers}
                    onEdit={handleEditSubUser}
                    onDelete={handleDeleteSubUser}
                />
            )}
        </div>
    );
};
