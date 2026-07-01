import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { validateEmail } from "../utils/validators";
import { toast } from "sonner";

export const useLoginForm = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        const name = e.target.name as keyof typeof errors;
        if (errors[name]) setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors = { email: "", password: "" };

        const emailValidationError = validateEmail(formData.email);
        if (emailValidationError) {
            newErrors.email = emailValidationError;
        }
        if (!formData.password.trim()) newErrors.password = "La contraseña es requerida.";

        if (newErrors.email || newErrors.password) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setApiError("");
        try {
            const result = await login(formData.email, formData.password);
            if (result.success) {
                toast.success("¡Inicio de sesión exitoso!");
                navigate("/dashboard");
            } else {
                const errMsg = result.error || "Credenciales incorrectas";
                setApiError(errMsg);
                toast.error(errMsg);
            }
        } catch (err: any) {
            const errMsg = "Error de conexión al iniciar sesión.";
            setApiError(errMsg);
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        errors,
        apiError,
        loading,
        handleChange,
        handleSubmit
    };
};
