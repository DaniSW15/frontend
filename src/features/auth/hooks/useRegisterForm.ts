import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { validateRFC, validateEmail } from "../utils/validators";
import { toast } from "sonner";

export const useRegisterForm = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        rfc: "",
        password: "",
        password_confirmation: ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [apiErrors, setApiErrors] = useState<string[]>([]);
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

        if (!formData.name.trim()) newErrors.name = "El nombre es requerido";

        const emailValidationError = validateEmail(formData.email);
        if (emailValidationError) {
            newErrors.email = emailValidationError;
        }

        const rfcValidationError = validateRFC(formData.rfc);
        if (rfcValidationError) {
            newErrors.rfc = rfcValidationError;
        }

        if (!formData.password) {
            newErrors.password = "La contraseña es requerida";
        }
        if (!formData.password_confirmation) {
            newErrors.password_confirmation = "La confirmación de la contraseña es requerida";
        } else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = "Las contraseñas no coinciden";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setApiErrors([]);

        try {
            const result = await register(formData);
            if (result.success) {
                toast.success("¡Registro exitoso! Bienvenido.");
                navigate("/dashboard");
            } else if (result.errors) {
                setApiErrors(result.errors);
                result.errors.forEach((err: string) => toast.error(err));
            }
        } catch (err: any) {
            const errMsg = "Error de conexión al registrar cuenta.";
            setApiErrors([errMsg]);
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        errors,
        apiErrors,
        loading,
        handleChange,
        handleSubmit
    };
};
