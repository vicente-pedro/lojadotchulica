import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos');
        }
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar produtos da API:', err);
        setError(err.message);
        // Fallback para dados locais em caso de erro
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const updateProducts = async (updatedProducts) => {
    try {
      // Atualiza localmente primeiro para UX rápida
      setProducts(updatedProducts);
      
      // Depois sincroniza com a API (se necessário)
      for (const product of updatedProducts) {
        if (product.id) {
          await fetch(`${API_URL}/products/${product.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
          });
        }
      }
    } catch (err) {
      console.error('Erro ao atualizar produtos:', err);
      setError(err.message);
    }
  };

  return { products, updateProducts, loading, error };
};
