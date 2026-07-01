import { useState } from "react";
import { subUserApi } from "../services/subUserApi";
import { validateRFC } from "@/features/auth";
import { toast } from "sonner";

interface UseSubUserFormProps {
    initialData?: any;
    onSuccess: () => void;
}

export const useSubUserForm = ({ initialData, onSuccess }: UseSubUserFormProps) => {
    const isEdit = !!initialData?.id;

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        email: initialData?.email || "",
        rfc: initialData?.rfc || "",
        password: "",
        password_confirmation: "",
        address: initialData?.address || "",
        phone: initialData?.phone || "",
        website: initialData?.website || ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [apiErrors, setApiErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        // Validaciones requeridas
        if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
        if (!formData.email.trim()) newErrors.email = "El correo es requerido";

        const rfcErr = validateRFC(formData.rfc);
        if (rfcErr) newErrors.rfc = rfcErr;

        if (!formData.address.trim()) newErrors.address = "La dirección es requerida";
        if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido";
        if (!formData.website.trim()) newErrors.website = "El sitio web es requerido";

        // Contraseña obligatoria si es nuevo
        if (!isEdit && !formData.password) {
            newErrors.password = "La contraseña es requerida";
        }
        if (formData.password && formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = "Las contraseñas no coinciden";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setApiErrors([]);

        try {
            const payload: any = {
                name: formData.name,
                email: formData.email,
                rfc: formData.rfc,
                address: formData.address,
                phone: formData.phone,
                website: formData.website,
                ...(formData.password ? { password: formData.password, password_confirmation: formData.password_confirmation } : {})
            };

            if (isEdit) {
                await subUserApi.updateSubUser(initialData.id, payload);
                toast.success("Usuario actualizado correctamente.");
            } else {
                await subUserApi.createSubUser(payload);
                toast.success("Usuario registrado correctamente.");
            }
            onSuccess();
        } catch (err: any) {
            const errMsg = err.response?.data?.error || "Error al guardar el sub-usuario.";
            setApiErrors(err.response?.data?.errors || [errMsg]);
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return { formData, errors, apiErrors, loading, handleChange, handleSubmit };
};
