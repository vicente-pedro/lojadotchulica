import { useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const initial = [...initialProducts];
    const saved = localStorage.getItem('products');
    let allProducts = [];
    if (saved) {
      const savedProducts = JSON.parse(saved);
      const merged = initial.map(p => {
        const savedP = savedProducts.find(sp => sp.id === p.id);
        return savedP || p;
      });
      const newProducts = savedProducts.filter(sp => !initial.find(p => p.id === sp.id));
      allProducts = [...merged, ...newProducts];
    } else {
      allProducts = initial;
    }
    setProducts(allProducts);
  }, []);

  const updateProducts = (updatedProducts) => {
    const initial = [...initialProducts];
    const merged = initial.map(p => {
      const updatedP = updatedProducts.find(up => up.id === p.id);
      return updatedP || p;
    });
    const newProducts = updatedProducts.filter(up => !initial.find(p => p.id === up.id));
    const finalProducts = [...merged, ...newProducts];

    localStorage.setItem('products', JSON.stringify(finalProducts));
    setProducts(finalProducts);
  };

  return { products, updateProducts };
};
