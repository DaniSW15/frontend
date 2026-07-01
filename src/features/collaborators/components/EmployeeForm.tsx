import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEmployeeForm } from "../hooks/useEmployeeForm";

interface EmployeeFormCompProps {
    initialData?: any;
    onSuccess: () => void;
    statesList: string[];
    onCancel: () => void;
}

export const EmployeeForm = ({ initialData, onSuccess, statesList, onCancel }: EmployeeFormCompProps) => {
    const { formData, errors, apiErrors, loading, handleChange, handleSubmit } = useEmployeeForm({
        initialData,
        onSuccess,
        statesList
    });

    return (
        <Card className="shadow-lg p-4">
            <CardHeader className="mb-4">
                <CardTitle>{initialData?.id ? "Editar Colaborador" : "Nuevo Colaborador"}</CardTitle>
                <CardDescription>Completa todos los campos requeridos para el expediente.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {apiErrors.length > 0 && (
                        <div className="bg-destructive/15 border border-destructive/30 text-destructive text-sm rounded-lg p-3">
                            {apiErrors.map((err, idx) => <p key={idx}>{err}</p>)}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="space-y-1">
                            <Label htmlFor="name">Nombre Completo</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} aria-invalid={!!errors.name} />
                            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} aria-invalid={!!errors.email} />
                            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                        </div>

                        {/* RFC */}
                        <div className="space-y-1">
                            <Label htmlFor="rfc">RFC</Label>
                            <Input id="rfc" name="rfc" value={formData.rfc} onChange={handleChange} aria-invalid={!!errors.rfc} />
                            {errors.rfc && <p className="text-xs text-destructive">{errors.rfc}</p>}
                        </div>

                        {/* CURP */}
                        <div className="space-y-1">
                            <Label htmlFor="curp">CURP</Label>
                            <Input id="curp" name="curp" value={formData.curp} onChange={handleChange} aria-invalid={!!errors.curp} />
                            {errors.curp && <p className="text-xs text-destructive">{errors.curp}</p>}
                        </div>

                        {/* NSS */}
                        <div className="space-y-1">
                            <Label htmlFor="social_security_number">NSS</Label>
                            <Input id="social_security_number" name="social_security_number" value={formData.social_security_number} onChange={handleChange} aria-invalid={!!errors.social_security_number} />
                            {errors.social_security_number && <p className="text-xs text-destructive">{errors.social_security_number}</p>}
                        </div>

                        {/* Start Date */}
                        <div className="space-y-1">
                            <Label htmlFor="start_date">Fecha de Ingreso</Label>
                            <Input id="start_date" type="date" name="start_date" value={formData.start_date} onChange={handleChange} aria-invalid={!!errors.start_date} />
                            {errors.start_date && <p className="text-xs text-destructive">{errors.start_date}</p>}
                        </div>

                        {/* Contract Type */}
                        <div className="space-y-1">
                            <Label htmlFor="contract_type">Tipo de Contrato</Label>
                            <select id="contract_type" name="contract_type" value={formData.contract_type} onChange={handleChange} className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2 py-1 text-sm focus-visible:outline-none text-foreground dark:bg-card">
                                <option value="Planta">Planta</option>
                                <option value="Honorarios">Honorarios</option>
                                <option value="Temporal">Temporal</option>
                            </select>
                        </div>

                        {/* Department */}
                        <div className="space-y-1">
                            <Label htmlFor="department">Departamento</Label>
                            <Input id="department" name="department" value={formData.department} onChange={handleChange} aria-invalid={!!errors.department} />
                            {errors.department && <p className="text-xs text-destructive">{errors.department}</p>}
                        </div>

                        {/* Position */}
                        <div className="space-y-1">
                            <Label htmlFor="position">Puesto</Label>
                            <Input id="position" name="position" value={formData.position} onChange={handleChange} aria-invalid={!!errors.position} />
                            {errors.position && <p className="text-xs text-destructive">{errors.position}</p>}
                        </div>

                        {/* State */}
                        <div className="space-y-1">
                            <Label htmlFor="state">Estado</Label>
                            <select id="state" name="state" value={formData.state} onChange={handleChange} className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2 py-1 text-sm focus-visible:outline-none text-foreground dark:bg-card">
                                {statesList.map(st => <option key={st} value={st}>{st}</option>)}
                            </select>
                        </div>

                        {/* Daily Salary */}
                        <div className="space-y-1">
                            <Label htmlFor="daily_salary">Sueldo Diario</Label>
                            <Input id="daily_salary" type="number" step="0.01" name="daily_salary" value={formData.daily_salary} onChange={handleChange} aria-invalid={!!errors.daily_salary} />
                            {errors.daily_salary && <p className="text-xs text-destructive">{errors.daily_salary}</p>}
                        </div>

                        {/* Salary */}
                        <div className="space-y-1">
                            <Label htmlFor="salary">Sueldo Mensual</Label>
                            <Input id="salary" type="number" step="0.01" name="salary" value={formData.salary} onChange={handleChange} aria-invalid={!!errors.salary} />
                            {errors.salary && <p className="text-xs text-destructive">{errors.salary}</p>}
                        </div>

                        {/* Entity Key */}
                        <div className="space-y-1">
                            <Label htmlFor="entity_key">Clave de Entidad</Label>
                            <Input id="entity_key" name="entity_key" value={formData.entity_key} onChange={handleChange} aria-invalid={!!errors.entity_key} />
                            {errors.entity_key && <p className="text-xs text-destructive">{errors.entity_key}</p>}
                        </div>
                    </div>

                    {/* Fiscal Address */}
                    <div className="space-y-1">
                        <Label htmlFor="fiscal_address">Domicilio Fiscal</Label>
                        <textarea id="fiscal_address" name="fiscal_address" value={formData.fiscal_address} onChange={handleChange} rows={2} className="flex w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring aria-invalid:border-destructive text-foreground" />
                        {errors.fiscal_address && <p className="text-xs text-destructive">{errors.fiscal_address}</p>}
                    </div>

                    <div className="flex gap-2 justify-end mt-4">
                        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Guardando..." : "Guardar"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};