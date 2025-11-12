import { useState, useEffect } from 'react';
import type { Product } from '../types';
import { products as initialProducts } from '../data/products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Sempre incluir todos os produtos iniciais, aplicando modificações do localStorage
    const initial = [...initialProducts];
    const saved = localStorage.getItem('products');
    let allProducts: Product[] = [];
    if (saved) {
      const savedProducts: Product[] = JSON.parse(saved);
      // Atualizar produtos iniciais com mudanças salvas
      const merged = initial.map(p => {
        const savedP = savedProducts.find(sp => sp.id === p.id);
        return savedP || p;
      });
      // Adicionar novos produtos não presentes nos iniciais
      const newProducts = savedProducts.filter(sp => !initial.find(p => p.id === sp.id));
      allProducts = [...merged, ...newProducts];
    } else {
      allProducts = initial;
    }
    setProducts(allProducts);
  }, []);

  const updateProducts = (updatedProducts: Product[]) => {
    // Sempre manter todos os produtos iniciais, aplicando apenas modificações
    const initial = [...initialProducts];
    const merged = initial.map(p => {
      const updatedP = updatedProducts.find(up => up.id === p.id);
      return updatedP || p;
    });
    // Adicionar novos produtos não presentes nos iniciais
    const newProducts = updatedProducts.filter(up => !initial.find(p => p.id === up.id));
    const finalProducts = [...merged, ...newProducts];

    localStorage.setItem('products', JSON.stringify(finalProducts));
    setProducts(finalProducts);
  };

  return { products, updateProducts };
};
