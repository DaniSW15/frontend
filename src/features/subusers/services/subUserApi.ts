import api from "@/services/api"

export const subUserApi = {
    getSubUsers: async () => {
        const res = await api.get("/users");
        return res.data;
    },
    createSubUser: async (payload: any) => {
        const res = await api.post("/users", { user: payload });
        return res.data;
    },
    updateSubUser: async (id: number, payload: any) => {
        const res = await api.put(`/users/${id}`, { user: payload });
        return res.data;
    },
    deleteSubUser: async (id: number) => {
        const res = await api.delete(`/users/${id}`);
        return res.data;
    }
}