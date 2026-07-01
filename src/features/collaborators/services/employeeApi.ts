import api from "@/services/api";

export interface EmployeeInput {
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

export const employeeApi = {
    /**
     * Obtiene la lista completa de colaboradores del usuario actual
     */
    getEmployees: async () => {
        const res = await api.get("/employees");
        return res.data;
    },

    /**
     * Obtiene el catálogo de estados de la República Mexicana
     */
    getStates: async () => {
        const res = await api.get("/employees/states");
        return res.data.states;
    },

    /**
     * Registra un nuevo colaborador
     */
    createEmployee: async (employee: EmployeeInput) => {
        const res = await api.post("/employees", { employee });
        return res.data;
    },

    /**
     * Actualiza la información de un colaborador existente
     */
    updateEmployee: async (id: number, employee: EmployeeInput) => {
        const res = await api.put(`/employees/${id}`, { employee });
        return res.data;
    },

    /**
     * Elimina un colaborador del sistema
     */
    deleteEmployee: async (id: number) => {
        await api.delete(`/employees/${id}`);
    }
};
