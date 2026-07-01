import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import type { Post } from "../hooks/usePostsManager";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PostCardProps {
    post: Post;
    onEdit: (post: Post) => void;
    onDelete: (id: number) => void;
}

export const PostCard = ({ post, onEdit, onDelete }: PostCardProps) => {
    return (
        <Card className="flex flex-col justify-between shadow-sm border border-border w-full h-full overflow-hidden">
            <CardHeader className="p-6 pb-4">
                <CardTitle className="line-clamp-1 text-lg text-foreground font-semibold">
                    {post.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 px-6 pb-6 pt-0">
                <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                    {post.body}
                </p>
            </CardContent>

            <CardFooter className="flex justify-end gap-2 p-4 border-t border-border/60 bg-muted/30">
                <Button
                    onClick={() => onEdit(post)}
                    variant="outline"
                    size="sm"
                    className="h-8"
                >
                    Editar
                </Button>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="destructive"
                            size="sm"
                            className="h-8"
                        >
                            Eliminar
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirmar Eliminación</DialogTitle>
                            <DialogDescription>
                                ¿Estás seguro de que deseas eliminar la publicación "{post.title}"? Esta acción no se puede deshacer.
                            </DialogDescription>
                        </DialogHeader>

                        <DialogFooter className="mt-4 flex gap-2 justify-end">
                            <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>

                            <Button
                                variant="destructive"
                                onClick={() => onDelete(post.id)}
                            >
                                Sí, eliminar
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </CardFooter>
        </Card>
    );
};
