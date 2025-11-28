import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products, loading, error } = useProducts();
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  const product = products.find(p => p.id === Number(id));

  if (loading) {
    return (
      <div className="product-not-found">
        <h2>Carregando...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-not-found">
        <h2>Produto não encontrado</h2>
        <button onClick={() => navigate('/produtos')} className="back-button">Voltar para produtos</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert('Por favor, selecione uma cor antes de adicionar ao carrinho.');
      return;
    }
    addToCart(product, selectedColor);
    alert(`${product.name}${selectedColor ? ` (${selectedColor})` : ''} adicionado ao carrinho!`);
  };

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <button onClick={() => navigate(-1)} className="back-link">← Voltar</button>

        <div className="product-detail-content">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
            <span className={`product-badge ${product.category}`}>{product.category === 'smartphone' ? 'Smartphone' : 'Acessório'}</span>
          </div>

          <div className="product-detail-info">
            <h1>{product.name}</h1>
            <div className="product-price-section"><span className="product-price-label">Preço: </span><span className="product-price-value">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>

            <div className="product-stock-section">{product.stock > 0 ? (<span className="stock-available">✓ {product.stock} unidades disponíveis</span>) : (<span className="stock-unavailable">✗ Produto esgotado</span>)}</div>

            {product.colors && product.colors.length > 0 && (
              <div className="product-colors-section">
                <h3>Cores Disponíveis</h3>
                <div className="colors-selection">
                  {product.colors.map((color, index) => (
                    <button key={index} className={`color-option ${selectedColor === color ? 'selected' : ''}`} onClick={() => setSelectedColor(color)}>{color}</button>
                  ))}
                </div>
                {selectedColor && (<p className="selected-color-display">Cor selecionada: <strong>{selectedColor}</strong></p>)}
              </div>
            )}

            <div className="product-actions">
              <button onClick={handleAddToCart} disabled={product.stock === 0} className="add-to-cart-button">Adicionar ao Carrinho</button>
              <button onClick={() => navigate('/produtos')} className="continue-shopping-button">Continuar Comprando</button>
            </div>

            <div className="product-description"><h3>Descrição</h3><p>{product.description}</p></div>

            <div className="product-features"><h3>Características</h3><ul><li>Produto original.</li><li>Garantia de fábrica.</li><li>Entrega rápida.</li><li>Parcelamento sem juros.</li></ul></div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>Produtos Relacionados</h2>
            <div className="related-products-grid">
              {relatedProducts.map(relatedProduct => (
                  <div
                    key={relatedProduct.id}
                    className="related-product-card"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setTimeout(() => navigate(`/produto/${relatedProduct.id}`), 50);
                    }}
                  >
                    <img src={relatedProduct.image} alt={relatedProduct.name} />
                    <h4>{relatedProduct.name}</h4>
                    <p className="related-price">R$ {relatedProduct.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
