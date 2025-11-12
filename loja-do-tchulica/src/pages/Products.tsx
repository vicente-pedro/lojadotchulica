import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('categoria');
  const { products } = useProducts();

  // Efeito para rolar para o topo quando o componente é montado
  useEffect(() => {
    // Força o scroll para o topo imediatamente quando o componente é montado
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl || 'all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filtro por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filtro por marca (apenas para smartphones)
    if (selectedBrand !== 'all' && selectedCategory === 'smartphone') {
      filtered = filtered.filter(p => p.brand === selectedBrand);
    }

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenação
    let sorted = [...filtered];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return sorted;
  }, [products, searchTerm, selectedCategory, selectedBrand, sortBy]);

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Nossos Produtos</h1>
        <p>Encontre os melhores smartphones e acessórios.</p>
      </div>

      <div className="products-container">
        <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
          <div className="filters-header">
            <h2>Filtros</h2>
          </div>
          <div className="filter-section">
            <h3>Buscar</h3>
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-section">
            <h3>Categoria</h3>
            <div className="filter-options">
              <label className="filter-option">
                <input
                  type="radio"
                  name="category"
                  value="all"
                  checked={selectedCategory === 'all'}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedBrand('all'); // Reset brand filter when category changes
                  }}
                />
                <span>Todos</span>
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="category"
                  value="smartphone"
                  checked={selectedCategory === 'smartphone'}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedBrand('all'); // Reset brand filter when category changes
                  }}
                />
                <span>Smartphones</span>
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="category"
                  value="acessorio"
                  checked={selectedCategory === 'acessorio'}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedBrand('all'); // Reset brand filter when category changes
                  }}
                />
                <span>Acessórios</span>
              </label>
            </div>
          </div>

          {selectedCategory === 'smartphone' && (
            <div className="filter-section">
              <h3>Marca</h3>
              <div className="filter-options">
                <label className="filter-option">
                  <input
                    type="radio"
                    name="brand"
                    value="all"
                    checked={selectedBrand === 'all'}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  />
                  <span>Todas</span>
                </label>
                <label className="filter-option">
                  <input
                    type="radio"
                    name="brand"
                    value="iPhone"
                    checked={selectedBrand === 'iPhone'}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  />
                  <span>iPhone</span>
                </label>
                <label className="filter-option">
                  <input
                    type="radio"
                    name="brand"
                    value="Samsung"
                    checked={selectedBrand === 'Samsung'}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  />
                  <span>Samsung</span>
                </label>
                <label className="filter-option">
                  <input
                    type="radio"
                    name="brand"
                    value="Motorola"
                    checked={selectedBrand === 'Motorola'}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  />
                  <span>Motorola</span>
                </label>
                <label className="filter-option">
                  <input
                    type="radio"
                    name="brand"
                    value="Xiaomi"
                    checked={selectedBrand === 'Xiaomi'}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  />
                  <span>Xiaomi</span>
                </label>
              </div>
            </div>
          )}

          <div className="filter-section">
            <h3>Ordenar por</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="default">Padrão</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
              <option value="name">Nome (A-Z)</option>
            </select>
          </div>

          <div className="filters-footer">
            <div className="products-count-sidebar">
              <p>{filteredAndSortedProducts.length} produtos encontrados</p>
            </div>
            <button
              onClick={() => setShowFilters(false)}
              className="apply-filters-btn"
            >
              Filtrar
            </button>
          </div>
        </aside>

        <main className="products-main">
          <div className="products-controls">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="toggle-filters-btn"
            >
              {showFilters ? '✕' : 'Filtros'}
            </button>
          </div>

          {filteredAndSortedProducts.length > 0 ? (
            <div className="products-grid">
              {filteredAndSortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <div className="no-products-icon"></div>
              <h2>Nenhum produto encontrado</h2>
              <p>Tente ajustar os filtros ou buscar por outro termo.</p>
            </div>
          )}

          <div className="products-count">
            <p>{filteredAndSortedProducts.length} produtos</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
