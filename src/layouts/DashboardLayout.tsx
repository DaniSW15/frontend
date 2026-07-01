import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Users, UserPlus, SpellCheck, FileText, LogOut, Settings } from "lucide-react"

type TabType = "employees" | "users" | "palindromes" | "posts" | "profile";

interface DashboardLayoutProps {
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
    children: React.ReactNode;
}

export const DashboardLayout = ({ activeTab, setActiveTab, children }: DashboardLayoutProps) => {
    const { user, logout } = useContext(AuthContext);

    const tabTitles: Record<TabType, string> = {
        employees: "Gestión de Colaboradores",
        profile: "Configuración de Cuenta",
        users: "Gestión de Sub-usuarios",
        palindromes: "Algoritmo de Palíndromos",
        posts: "Consumo de API de Publicaciones",
    };

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full bg-muted/40 font-sans overflow-hidden">
                <Sidebar>
                    <SidebarHeader className="border-b border-border p-4 bg-card">
                        <h2 className="text-lg font-bold tracking-tight text-foreground">Control Panel</h2>
                        <p className="text-xs text-muted-foreground">Sesión: {user?.name}</p>
                    </SidebarHeader>

                    <SidebarContent className="bg-card">
                        <SidebarGroup>
                            <SidebarGroupLabel>Navegación</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {/* Colaboradores */}
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            isActive={activeTab === "employees"}
                                            onClick={() => setActiveTab("employees")}
                                        >
                                            <Users className="mr-2 h-4 w-4" />
                                            <span>Colaboradores</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    {/* Configuración de Cuenta */}
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            isActive={activeTab === "profile"}
                                            onClick={() => setActiveTab("profile")}
                                        >
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Configuración de Cuenta</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    {/* Sub-usuarios (Solo Admin) */}
                                    {user?.role === "admin" && (
                                        <SidebarMenuItem>
                                            <SidebarMenuButton
                                                isActive={activeTab === "users"}
                                                onClick={() => setActiveTab("users")}
                                            >
                                                <UserPlus className="mr-2 h-4 w-4" />
                                                <span>Sub-usuarios</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )}

                                    {/* Palíndromos */}
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            isActive={activeTab === "palindromes"}
                                            onClick={() => setActiveTab("palindromes")}
                                        >
                                            <SpellCheck className="mr-2 h-4 w-4" />
                                            <span>Palíndromos</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    {/* Posts Externos */}
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            isActive={activeTab === "posts"}
                                            onClick={() => setActiveTab("posts")}
                                        >
                                            <FileText className="mr-2 h-4 w-4" />
                                            <span>Publicaciones Externas</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>

                    <SidebarFooter className="border-t border-border p-4 bg-card">
                        <Button onClick={logout} variant="destructive" className="w-full flex items-center justify-center gap-2">
                            <LogOut className="h-4 w-4" />
                            Cerrar Sesión
                        </Button>
                    </SidebarFooter>
                </Sidebar>

                <SidebarInset className="flex-1 flex flex-col overflow-y-auto">
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border bg-card px-4">
                        <SidebarTrigger className="h-9 w-9" />
                        <span className="h-4 w-px bg-border mx-2" />
                        <span className="font-semibold text-sm text-foreground">
                            {tabTitles[activeTab]}
                        </span>
                    </header>

                    <div className="flex-1 p-8">
                        {children}
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
};
