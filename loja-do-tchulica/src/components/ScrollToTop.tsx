import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Componente que rola a página para o topo quando a rota muda
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Força o scroll para o topo imediatamente quando a rota muda
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
