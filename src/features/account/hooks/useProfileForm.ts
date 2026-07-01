import { useState, useEffect } from "react";
import { accountApi } from "../services/accountApi";
import { validateRFC } from "@/features/auth";
import { toast } from "sonner";

interface UseProfileProps {
    user: any;
    setUser: (user: any) => void;
}

export const useProfile = ({ user, setUser }: UseProfileProps) => {
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        rfc: user?.rfc || "",
        address: user?.address || "",
        phone: user?.phone || "",
        website: user?.website || ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [apiErrors, setApiErrors] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                rfc: user.rfc || "",
                address: user.address || "",
                phone: user.phone || "",
                website: user.website || ""
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        // Validaciones en cliente
        if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
        if (!formData.email.trim()) newErrors.email = "El correo es requerido";

        const rfcErr = validateRFC(formData.rfc);
        if (rfcErr) newErrors.rfc = rfcErr;

        // Dirección, teléfono y sitio web son opcionales para admin, pero requeridos para sub-usuarios
        if (user?.creator_id) {
            if (!formData.address.trim()) newErrors.address = "La dirección es requerida";
            if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido";
            if (!formData.website.trim()) newErrors.website = "El sitio web es requerido";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setApiErrors([]);
        setSuccessMessage("");

        try {
            const updatedUser = await accountApi.updateProfile(formData);

            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);

            toast.success("Perfil actualizado exitosamente.");
            setSuccessMessage("Perfil actualizado exitosamente.");
        } catch (err: any) {
            const errMsg = err.response?.data?.error || "Error al actualizar el perfil.";
            setApiErrors(err.response?.data?.errors || [errMsg]);
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        errors,
        apiErrors,
        successMessage,
        loading,
        handleChange,
        handleSubmit
    };
};
