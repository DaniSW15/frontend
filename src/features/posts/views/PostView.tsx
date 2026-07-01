import { usePostsManager } from "../hooks/usePostsManager";
import { PostForm } from "../components/PostForm";
import { PostCard } from "../components/PostCard";
import { Button } from "@/components/ui/button";

export const PostsView = () => {
    const {
        posts,
        postForm,
        setPostForm,
        showPostForm,
        setShowPostForm,
        loading,
        handleSavePost,
        handleEditPost,
        handleDeletePost
    } = usePostsManager();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Publicaciones Externas</h1>
                    <p className="text-muted-foreground text-sm">
                        Consumo e interacción con la API externa de JSONPlaceholder.
                    </p>
                </div>
                {!showPostForm && (
                    <Button onClick={() => setShowPostForm(true)}>+ Crear Publicación</Button>
                )}
            </div>

            {showPostForm ? (
                <PostForm
                    postForm={postForm}
                    setPostForm={setPostForm}
                    onSubmit={handleSavePost}
                    onCancel={() => setShowPostForm(false)}
                />
            ) : loading ? (
                <p className="text-center text-muted-foreground py-8">Cargando publicaciones...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onEdit={handleEditPost}
                            onDelete={handleDeletePost}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
