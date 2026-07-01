import { Button } from "@/components/ui/button";

interface InternalHeaderProps {
    showForm: boolean;
    onAddClick: () => void;
}

export const InternalHeader = ({ showForm, onAddClick }: InternalHeaderProps) => {
    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Colaboradores</h1>
                <p className="text-muted-foreground text-sm">Administración de expedientes y nómina.</p>
            </div>
            {!showForm && (
                <Button onClick={onAddClick}>+ Agregar Colaborador</Button>
            )}
        </div>
    );
};
