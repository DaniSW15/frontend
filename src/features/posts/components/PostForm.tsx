import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PostFormProps {
    postForm: { id: number; title: string; body: string };
    setPostForm: React.Dispatch<React.SetStateAction<{ id: number; title: string; body: string }>>;
    onSubmit: (e: React.SubmitEvent) => void;
    onCancel: () => void;
}

export const PostForm = ({ postForm, setPostForm, onSubmit, onCancel }: PostFormProps) => {
    return (
        <Card className="max-w-xl shadow-md p-4">
            <CardHeader>
                <CardTitle>{postForm.id ? "Editar Publicación" : "Crear Publicación"}</CardTitle>
                <CardDescription>Esta acción interactúa con el API de posts.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="space-y-4 mt-4">
                    <div className="space-y-1">
                        <Label htmlFor="post-title">Título</Label>
                        <Input
                            id="post-title"
                            value={postForm.title}
                            onChange={(e) => setPostForm(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Título del post"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="post-body">Contenido</Label>
                        <textarea
                            id="post-body"
                            value={postForm.body}
                            onChange={(e) => setPostForm(prev => ({ ...prev, body: e.target.value }))}
                            rows={4}
                            className="flex w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring text-foreground"
                            placeholder="Escribe el cuerpo de tu post..."
                        />
                    </div>
                    <div className="flex gap-2 justify-end">
                        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
                        <Button type="submit">Guardar</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};
