import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface SubUser {
    id: number;
    name: string;
    email: string;
    rfc: string;
}

interface SubUserTableProps {
    subUsers: SubUser[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export const SubUserTable = ({ subUsers, onEdit, onDelete }: SubUserTableProps) => {
    return (
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Correo Electrónico</TableHead>
                        <TableHead>RFC</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subUsers.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                No hay sub-usuarios registrados.
                            </TableCell>
                        </TableRow>
                    ) : (
                        subUsers.map((su) => (
                            <TableRow key={su.id}>
                                <TableCell className="font-medium text-foreground">{su.name}</TableCell>
                                <TableCell className="text-foreground">{su.email}</TableCell>
                                <TableCell className="text-foreground">{su.rfc}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onEdit(su.id)}
                                        className="text-primary hover:text-primary/80"
                                    >
                                        Editar
                                    </Button>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-destructive hover:text-destructive/80"
                                            >
                                                Eliminar
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Confirmar Eliminación</DialogTitle>
                                                <DialogDescription>
                                                    ¿Estás seguro de que deseas eliminar al sub-usuario "{su.name}"? Esta acción no se puede deshacer y revocará su acceso administrativo.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter className="mt-4 flex gap-2 justify-end">
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancelar</Button>
                                                </DialogClose>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => onDelete(su.id)}
                                                >
                                                    Sí, eliminar
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
