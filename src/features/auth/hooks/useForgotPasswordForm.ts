import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../services/authApi";
import { validateRFC, validateEmail } from "../utils/validators";
import { toast } from "sonner";

export const useForgotPasswordForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        rfc: "",
        new_password: "",
        password_confirmation: ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [apiError, setApiError] = useState("");
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

        const emailValidationError = validateEmail(formData.email);
        if (emailValidationError) {
            newErrors.email = emailValidationError;
        }

        const rfcValidationError = validateRFC(formData.rfc);
        if (rfcValidationError) {
            newErrors.rfc = rfcValidationError;
        }

        if (!formData.new_password) {
            newErrors.new_password = "La nueva contraseña es requerida";
        }
        if (!formData.password_confirmation) {
            newErrors.password_confirmation = "La confirmación de la contraseña es requerida";
        } else if (formData.new_password !== formData.password_confirmation) {
            newErrors.password_confirmation = "Las contraseñas no coinciden";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setApiError("");
        setSuccessMessage("");

        try {
            const response = await authApi.forgotPassword({
                email: formData.email,
                rfc: formData.rfc,
                new_password: formData.new_password,
                password_confirmation: formData.password_confirmation
            });

            const msg = response.message || "Contraseña restablecida exitosamente.";
            toast.success(msg);
            setSuccessMessage(msg);
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (error: any) {
            const message = error.response?.data?.error ||
                error.response?.data?.errors?.[0] ||
                "Los datos introducidos no coinciden con nuestros registros.";
            setApiError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        errors,
        apiError,
        successMessage,
        loading,
        handleChange,
        handleSubmit
    };
};
