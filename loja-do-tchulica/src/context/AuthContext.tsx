import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthContextType } from '../types';
import type { ReactNode } from 'react';

// Importar CartContext para limpar carrinho no logout
import { useCart } from './CartContext';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { clearCart } = useCart();

  useEffect(() => {
    // Carregar usuário do localStorage na montagem
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Carregar usuários registrados do localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    // Verificar se usuário existe nos usuários registrados
    const foundUser = registeredUsers.find((u: any) => u.email === email && u.password === password);
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }

    // Verificar usuário admin
    if (email === 'admin@tchulica.com' && password === 'admin123') {
      const adminUser = { id: 1, username: 'admin', email: 'admin@tchulica.com', role: 'admin' as const };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return true;
    }

    return false;
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    // Carregar usuários registrados existentes
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    // Verificar se email já existe
    const existingUser = registeredUsers.find((u: any) => u.email === email);
    if (existingUser) {
      return false; // Email já registrado
    }

    // Criar novo usuário com senha
    const newUserWithPassword = {
      id: Date.now(),
      username,
      email,
      password,
      role: 'user' as const,
    };

    // Adicionar à lista de usuários registrados
    registeredUsers.push(newUserWithPassword);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

    // Definir usuário atual (sem senha)
    const { password: _, ...newUser } = newUserWithPassword;
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Limpar carrinho quando usuário faz logout
    clearCart();
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
