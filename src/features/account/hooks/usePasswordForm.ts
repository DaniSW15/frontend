import { useState } from "react";
import { accountApi } from "../services/accountApi";
import { toast } from "sonner";

export const usePasswordForm = () => {
    const [formData, setFormData] = useState({
        current_password: "",
        new_password: "",
        password_confirmation: ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [apiErrors, setApiErrors] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

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

        // Validaciones
        if (!formData.current_password) newErrors.current_password = "La contraseña actual es requerida";
        if (!formData.new_password) newErrors.new_password = "La nueva contraseña es requerida";
        if (!formData.password_confirmation) {
            newErrors.password_confirmation = "La confirmación de la contraseña es requerida";
        } else if (formData.new_password !== formData.password_confirmation) {
            newErrors.password_confirmation = "Las contraseñas no coinciden";
        } else if (formData.new_password.length < 8) {
            newErrors.new_password = "La nueva contraseña debe tener al menos 8 caracteres";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setApiErrors([]);
        setSuccessMessage("");

        try {
            const res = await accountApi.updatePassword(formData);

            localStorage.setItem("token", res.token);

            toast.success("Contraseña actualizada exitosamente.");
            setSuccessMessage("Contraseña actualizada exitosamente.");

            setFormData({ current_password: "", new_password: "", password_confirmation: "" });
        } catch (err: any) {
            const errMsg = err.response?.data?.error || "Error al actualizar la contraseña.";
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
