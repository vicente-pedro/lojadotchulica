import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const featuredProducts = products.slice(0, 6);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Bem-vindo à <span className="highlight">Loja do Tchulica</span>
          </h1>
          <p className="hero-subtitle">Os melhores smartphones e acessórios com preços incríveis.</p>
          <Link to="/produtos" className="hero-button">Ver Todos os Produtos</Link>
        </div>
        <div className="hero-image"><div className="hero-placeholder"></div></div>
      </section>

      <section className="categories">
        <h2 className="section-title">Categorias</h2>
        <div className="category-grid">
          <Link to="/produtos?categoria=smartphone" className="category-card">
            <div className="category-icon"></div>
            <h3>Smartphones</h3>
            <p>iPhone, Samsung, Xiaomi e mais.</p>
          </Link>
          <Link to="/produtos?categoria=acessorio" className="category-card">
            <div className="category-icon"></div>
            <h3>Acessórios</h3>
            <p>Fones, cases, carregadores e mais.</p>
          </Link>
        </div>
      </section>

      <section className="featured">
        <h2 className="section-title">Produtos em Destaque</h2>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="see-more">
          <Link to="/produtos" className="see-more-button">Ver Mais Produtos →</Link>
        </div>
      </section>

      <section className="benefits">
        <h2 className="section-title">Por que escolher a Loja do Tchulica?</h2>
        <div className="benefits-grid">
          <div className="benefit-card"><div className="benefit-icon"></div><h3>Entrega Rápida</h3><p>Receba seus produtos em até 48h.</p></div>
          <div className="benefit-card"><div className="benefit-icon"></div><h3>Parcelamento</h3><p>Parcele em até 12x sem juros.</p></div>
          <div className="benefit-card"><div className="benefit-icon"></div><h3>Compra Segura</h3><p>Ambiente 100% seguro.</p></div>
          <div className="benefit-card"><div className="benefit-icon"></div><h3>Garantia</h3><p>Todos os produtos com garantia.</p></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
