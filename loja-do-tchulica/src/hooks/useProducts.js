import { useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const API_URL = 'http://localhost:4000/api/products';

export const useProducts = ({ autoSync = true, intervalMs = 4 * 1000 } = {}) => {
  const [products, setProducts] = useState([]);

  async function syncWithApi() {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) return { ok: false, status: res.status };
      let apiProducts = await res.json();
      // Normalize ids to numbers when possible
      apiProducts = apiProducts.map(p => ({ ...p, id: typeof p.id === 'string' && /^\d+$/.test(p.id) ? Number(p.id) : p.id }));
      localStorage.setItem('products', JSON.stringify(apiProducts));
      setProducts(apiProducts);
      return { ok: true, data: apiProducts };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  useEffect(() => {
    let mounted = true;

    async function load() {
      // Try fetch from API first
      try {
        const res = await fetch(API_URL);
        if (res.ok) {
          let apiProducts = await res.json();
          // normalize ids
          apiProducts = apiProducts.map(p => ({ ...p, id: typeof p.id === 'string' && /^\d+$/.test(p.id) ? Number(p.id) : p.id }));
          if (!mounted) return;
          localStorage.setItem('products', JSON.stringify(apiProducts));
          setProducts(apiProducts);
          return;
        }
      } catch (err) {
        // ignore and fallback
      }

      // Fallback to local data + localStorage
      const initial = [...initialProducts];
      const saved = localStorage.getItem('products');
      let allProducts = [];
      if (saved) {
        let savedProducts = JSON.parse(saved);
        // normalize ids from storage
        savedProducts = savedProducts.map(p => ({ ...p, id: typeof p.id === 'string' && /^\d+$/.test(p.id) ? Number(p.id) : p.id }));
        const merged = initial.map(p => {
          const savedP = savedProducts.find(sp => sp.id === p.id);
          return savedP || p;
        });
        const newProducts = savedProducts.filter(sp => !initial.find(p => p.id === sp.id));
        allProducts = [...merged, ...newProducts];
      } else {
        allProducts = initial;
      }
      if (mounted) setProducts(allProducts);
    }

    load();

    // automatic polling sync
    let timer = null;
    if (autoSync) {
      timer = setInterval(() => {
        // run sync in background, no need to await here
        syncWithApi();
      }, intervalMs);
    }

    return () => { mounted = false; if (timer) clearInterval(timer); };
  }, [autoSync, intervalMs]);

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

  return { products, updateProducts, syncWithApi };
};
