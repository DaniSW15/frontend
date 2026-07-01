import React, { createContext, useState, useEffect, type ReactNode } from "react";
import { authApi } from "@/features/auth/services/authApi";

export interface User {
    id: number;
    name: string;
    email: string;
    rfc: string;
    role: string;
    address?: string;
    phone?: string;
    website?: string;
    creator_id?: number | null;
}

export interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (userData: any) => Promise<{ success: boolean; errors?: string[] }>;
    logout: () => Promise<void>;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Error parsing user from localStorage", e);
            }
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const data = await authApi.login(email, password);
            const { user: loggedUser, token } = data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(loggedUser));
            setUser(loggedUser);
            return { success: true };
        } catch (error: any) {
            const message = error.response?.data?.error || 'Error de conexión';
            return { success: false, error: message };
        }
    };

    const register = async (userData: any) => {
        try {
            const data = await authApi.register(userData);
            const { user: registeredUser, token } = data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(registeredUser));
            setUser(registeredUser);
            return { success: true };
        } catch (error: any) {
            const messages = error.response?.data?.errors || [error.response?.data?.error || 'Error en el registro'];
            return { success: false, errors: messages };
        }
    };

    const logout = async () => {
        try {
            await authApi.logout();
        } catch (e) {
            console.warn("Logout en backend falló o sesión ya expirada");
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};