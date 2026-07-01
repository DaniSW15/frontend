import { useEffect, useState } from "react";
import { employeeApi } from "../services/employeeApi";
import { EmployeeForm } from "../components/EmployeeForm";
import { InternalHeader } from "../components/InternalHeader";
import { toast } from "sonner";
import { CollaboratorTable } from "../components/CollaboratorTable";

interface Employee {
    id: number;
    name: string;
    email: string;
    rfc: string;
    fiscal_address: string;
    curp: string;
    social_security_number: string;
    start_date: string;
    contract_type: string;
    department: string;
    position: string;
    daily_salary: number;
    salary: number;
    entity_key: string;
    state: string;
}

export const CollaboratorsView = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [statesList, setStatesList] = useState<string[]>([]);
    const [showEmployeeForm, setShowEmployeeForm] = useState(false);
    const [editingEmployeeId, setEditingEmployeeId] = useState<number | null>(null);

    useEffect(() => {
        fetchEmployees();
        fetchStates();
    }, []);

    const fetchEmployees = async () => {
        try {
            const data = await employeeApi.getEmployees();
            setEmployees(data);
        } catch (err) {
            console.error("Error cargando colaboradores", err);
            toast.error("Error al cargar la lista de colaboradores.");
        }
    };

    const fetchStates = async () => {
        try {
            const states = await employeeApi.getStates();
            setStatesList(states);
        } catch (err) {
            console.error("Error cargando estados", err);
        }
    };

    const handleEditEmployee = (id: number) => {
        setEditingEmployeeId(id);
        setShowEmployeeForm(true);
    };

    const handleDeleteEmployee = async (id: number) => {
        try {
            await employeeApi.deleteEmployee(id);
            toast.success("Colaborador eliminado correctamente.");
            fetchEmployees();
        } catch (err: any) {
            console.error("Error eliminando colaborador", err);
            toast.error(err.response?.data?.error || "Error al eliminar el colaborador.");
        }
    };

    const resetEmployeeForm = () => {
        setEditingEmployeeId(null);
        setShowEmployeeForm(false);
    };

    const handleSuccess = () => {
        fetchEmployees();
        resetEmployeeForm();
    };

    return (
        <div className="space-y-6">
            <InternalHeader
                showForm={showEmployeeForm}
                onAddClick={() => setShowEmployeeForm(true)}
            />

            {showEmployeeForm ? (
                <EmployeeForm
                    initialData={editingEmployeeId ? employees.find(emp => emp.id === editingEmployeeId) : undefined}
                    onSuccess={handleSuccess}
                    statesList={statesList}
                    onCancel={resetEmployeeForm}
                />
            ) : (
                <>
                    {employees.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">No hay colaboradores registrados.</p>
                    ) : (
                        <CollaboratorTable
                            employees={employees}
                            onEdit={handleEditEmployee}
                            onDelete={handleDeleteEmployee}
                        />
                    )}
                </>
            )}
        </div>
    );
};
