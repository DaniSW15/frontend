import api from "@/services/api";

export interface PostInput {
    title: string;
    body: string;
}

export const postApi = {
    getPosts: async () => {
        const res = await api.get("/posts");
        return res.data;
    },
    getPostById: async (id: number) => {
        const res = await api.get(`/posts/${id}`);
        return res.data;
    },
    createPost: async (post: PostInput) => {
        const res = await api.post("/posts", post);
        return res.data;
    },
    updatePost: async (id: number, post: PostInput) => {
        const res = await api.put(`/posts/${id}`, post);
        return res.data;
    },
    deletePost: async (id: number) => {
        const res = await api.delete(`/posts/${id}`);
        return res.data;
    },
}