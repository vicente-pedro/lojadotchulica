import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (product.colors && product.colors.length > 0) {
      alert('Para adicionar este produto ao carrinho, acesse a página de detalhes e selecione uma cor.');
      return;
    }
    addToCart(product);
    alert(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <Link
      to={`/produto/${product.id}`}
      className="product-card"
      onClick={(e) => {
        // prevent default Link navigation and navigate after scrolling
        e.preventDefault();
        window.scrollTo(0, 0);
        // small timeout to ensure scroll has effect before navigation
        setTimeout(() => navigate(`/produto/${product.id}`), 50);
      }}
    >
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <span className={`product-category ${product.category}`}>
          {product.category === 'smartphone' ? (product.brand || 'Smartphone') : 'Acessório'}
        </span>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">
          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>

        {product.colors && product.colors.length > 0 && (
          <div className="product-colors">
            <span className="colors-label">Cores: </span>
            <div className="colors-list">
              {product.colors.slice(0, 3).map((color, index) => (
                <span key={index} className="color-tag">{color}</span>
              ))}
              {product.colors.length > 3 && (
                <span className="color-more">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>
        )}

        <div className="product-footer">
          <span className="product-stock">
            {product.stock > 0 ? `${product.stock} em estoque.` : 'Esgotado.'}
          </span>
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            Adicionar
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
