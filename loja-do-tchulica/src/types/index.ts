// Tipos TypeScript para o projeto

export interface Product {
  id: number;
  name: string;
  category: 'smartphone' | 'acessorio';
  brand?: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  colors?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, selectedColor?: string) => void;
  removeFromCart: (productId: number, selectedColor?: string) => void;
  updateQuantity: (productId: number, quantity: number, selectedColor?: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}
