import { useState, useEffect } from "react";
import { postApi } from "../services/postApi";
import { toast } from "sonner";

export interface Post {
    id: number;
    title: string;
    body: string;
}

export const usePostsManager = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [showPostForm, setShowPostForm] = useState(false);
    const [postForm, setPostForm] = useState({ id: 0, title: "", body: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const data = await postApi.getPosts();
            setPosts(data.slice(0, 10));
        } catch (err) {
            console.error("Error cargando posts", err);
            toast.error("No se pudieron cargar las publicaciones.");
        } finally {
            setLoading(false);
        }
    };

    const handleSavePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!postForm.title.trim() || !postForm.body.trim()) {
            toast.warning("Título y contenido son obligatorios");
            return;
        }

        try {
            if (postForm.id) {
                const updated = await postApi.updatePost(postForm.id, {
                    title: postForm.title,
                    body: postForm.body
                });
                setPosts(prev => prev.map(p => p.id === postForm.id ? updated : p));
                toast.success("Publicación actualizada correctamente.");
            } else {
                const created = await postApi.createPost({
                    title: postForm.title,
                    body: postForm.body
                });
                setPosts(prev => [created, ...prev]);
                toast.success("Publicación creada correctamente.");
            }
            setShowPostForm(false);
            setPostForm({ id: 0, title: "", body: "" });
        } catch (err) {
            console.error("Error al guardar post", err);
            toast.error("Error al guardar la publicación.");
        }
    };

    const handleEditPost = (post: Post) => {
        setPostForm(post);
        setShowPostForm(true);
    };

    const handleDeletePost = async (id: number) => {
        try {
            await postApi.deletePost(id);
            setPosts(prev => prev.filter(p => p.id !== id));
            toast.success("Publicación eliminada correctamente.");
        } catch (err: any) {
            console.error("Error al eliminar post", err);
            toast.error(err.response?.data?.error || "Error al eliminar la publicación.");
        }
    };

    return {
        posts,
        postForm,
        setPostForm,
        showPostForm,
        setShowPostForm,
        loading,
        handleSavePost,
        handleEditPost,
        handleDeletePost
    };
};
