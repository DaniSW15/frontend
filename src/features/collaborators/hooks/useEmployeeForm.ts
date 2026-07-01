import { useState } from "react";
import { employeeApi } from "../services/employeeApi";
import { validateRFC } from "@/features/auth";
import { toast } from "sonner";

interface EmployeeFormProps {
    initialData?: any;
    onSuccess: () => void;
    statesList?: string[];
}

export const useEmployeeForm = ({ initialData, onSuccess, statesList = [] }: EmployeeFormProps) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        email: initialData?.email || "",
        rfc: initialData?.rfc || "",
        fiscal_address: initialData?.fiscal_address || "",
        curp: initialData?.curp || "",
        social_security_number: initialData?.social_security_number || "",
        start_date: initialData?.start_date || "",
        contract_type: initialData?.contract_type || "Planta",
        department: initialData?.department || "",
        position: initialData?.position || "",
        daily_salary: initialData?.daily_salary?.toString() || "",
        salary: initialData?.salary?.toString() || "",
        entity_key: initialData?.entity_key || "",
        state: initialData?.state || statesList[0] || ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [apiErrors, setApiErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
        if (!formData.email.trim()) newErrors.email = "El correo es requerido";

        const rfcErr = validateRFC(formData.rfc);
        if (rfcErr) newErrors.rfc = rfcErr;

        if (!formData.fiscal_address.trim()) newErrors.fiscal_address = "El domicilio fiscal es requerido";

        if (!formData.curp.trim()) {
            newErrors.curp = "El CURP es requerido";
        } else if (formData.curp.trim().length !== 18) {
            newErrors.curp = "El CURP debe tener exactamente 18 caracteres";
        }

        if (!formData.social_security_number.trim()) newErrors.social_security_number = "El NSS es requerido";
        if (!formData.start_date) newErrors.start_date = "La fecha de ingreso es requerida";
        if (!formData.department.trim()) newErrors.department = "El departamento es requerido";
        if (!formData.position.trim()) newErrors.position = "El puesto es requerido";

        const dSalary = parseFloat(formData.daily_salary);
        if (isNaN(dSalary) || dSalary <= 0) newErrors.daily_salary = "Debe ser mayor a 0";

        const sal = parseFloat(formData.salary);
        if (isNaN(sal) || sal <= 0) newErrors.salary = "Debe ser mayor a 0";

        if (!formData.entity_key.trim()) newErrors.entity_key = "La clave de entidad es requerida";
        if (!formData.state) newErrors.state = "El estado es requerido";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setApiErrors([]);
        try {
            const employeeData = {
                ...formData,
                daily_salary: parseFloat(formData.daily_salary),
                salary: parseFloat(formData.salary)
            };

            if (initialData?.id) {
                await employeeApi.updateEmployee(initialData.id, employeeData);
                toast.success("Colaborador actualizado correctamente.");
            } else {
                await employeeApi.createEmployee(employeeData);
                toast.success("Colaborador registrado correctamente.");
            }
            onSuccess();
        } catch (err: any) {
            const errMsg = err.response?.data?.error || "Error al guardar el colaborador.";
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
        loading,
        handleChange,
        handleSubmit
    };
};
