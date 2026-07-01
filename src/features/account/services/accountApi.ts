import api from "@/services/api"

export const accountApi = {
    updateProfile: async (data: { name: string; email: string; rfc: string; address: string; phone: string; website: string }) => {
        const res = await api.put("/users/me", { user: data });
        return res.data;
    },

    updatePassword: async (data: Record<string, string>) => {
        const res = await api.patch("/auth/update_password", data);
        return res.data;
    }
}