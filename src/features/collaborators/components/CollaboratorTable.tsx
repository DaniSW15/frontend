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

interface Employee {
    id: number;
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

interface CollaboratorTableProps {
    employees: Employee[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export const CollaboratorTable = ({ employees, onEdit, onDelete }: CollaboratorTableProps) => {
    return (
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>RFC</TableHead>
                        <TableHead>Puesto</TableHead>
                        <TableHead>Departamento</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees.map((emp) => (
                        <TableRow key={emp.id} className="hover:bg-muted/50">
                            <TableCell className="font-medium text-foreground">{emp.name}</TableCell>
                            <TableCell className="text-foreground">{emp.rfc}</TableCell>
                            <TableCell className="text-foreground">{emp.position}</TableCell>
                            <TableCell className="text-foreground">{emp.department}</TableCell>
                            <TableCell className="text-foreground">{emp.state}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onEdit(emp.id)}
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
                                                ¿Estás seguro de que deseas eliminar al colaborador "{emp.name}"? Esta acción no se puede deshacer.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter className="mt-4 flex gap-2 justify-end">
                                            <DialogClose asChild>
                                                <Button variant="outline">Cancelar</Button>
                                            </DialogClose>
                                            <Button
                                                variant="destructive"
                                                onClick={() => onDelete(emp.id)}
                                            >
                                                Sí, eliminar
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
