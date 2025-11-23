import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product, CartItem, CartContextType } from '../types';

// Cria o contexto do carrinho
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provedor do contexto do carrinho
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estado para armazenar os itens do carrinho
  const [cart, setCart] = useState<CartItem[]>([]);

  // Função para adicionar produto ao carrinho
  const addToCart = (product: Product, selectedColor?: string) => {
    setCart(prevCart => {
      // Verifica se o item já existe no carrinho (mesmo produto e cor)
      const existingItem = prevCart.find(item =>
        item.id === product.id && item.selectedColor === selectedColor
      );

      // Se o item já existe, aumenta a quantidade
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id && item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Se não existe, adiciona como novo item
      return [...prevCart, { ...product, quantity: 1, selectedColor }];
    });
  };

  // Função para remover produto do carrinho
  const removeFromCart = (productId: number, selectedColor?: string) => {
    setCart(prevCart => prevCart.filter(item =>
      !(item.id === productId && item.selectedColor === selectedColor)
    ));
  };

  // Função para atualizar a quantidade de um produto no carrinho
  const updateQuantity = (productId: number, quantity: number, selectedColor?: string) => {
    // Se a quantidade for zero ou negativa, remove o item
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }

    // Atualiza a quantidade do item específico
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Função para limpar o carrinho
  const clearCart = () => {
    setCart([]);
  };

  // Função para calcular o preço total do carrinho
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Função para obter o número total de itens no carrinho
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Fornece o contexto do carrinho para os componentes filhos
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar o contexto do carrinho
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};
