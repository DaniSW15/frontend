import api from "@/services/api";

export const authApi = {
    login: async (email: string, password: string) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },
    register: async (userData: any) => {
        const response = await api.post('/auth/register', { user: userData });
        return response.data;
    },
    logout: async () => {
        await api.delete('/auth/logout');
    },
    forgotPassword: async (data: any) => {
        const response = await api.post("/auth/forgot_password", data);
        return response.data;
    }
};
