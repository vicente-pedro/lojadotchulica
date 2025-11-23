import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

// Interface para as propriedades do componente ProductCard
interface ProductCardProps {
  product: Product;
}

// Componente para exibir um card de produto na lista/grid
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Hook para acessar o contexto do carrinho
  const { addToCart } = useCart();

  // Função para lidar com o clique no botão "Adicionar ao Carrinho"
  const handleAddToCart = (e: React.MouseEvent) => {
    // Previne a navegação para a página de detalhes
    e.preventDefault();
    // Verifica se o produto tem cores disponíveis
    if (product.colors && product.colors.length > 0) {
      alert('Para adicionar este produto ao carrinho, acesse a página de detalhes e selecione uma cor.');
      return;
    }
    // Adiciona o produto ao carrinho
    addToCart(product);
    alert(`${product.name} adicionado ao carrinho!`);
  };

  // Renderiza o card do produto como um link para a página de detalhes
  return (
    <Link to={`/produto/${product.id}`} className="product-card">
      {/* Container da imagem do produto */}
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <span className={`product-category ${product.category}`}>
          {product.category === 'smartphone' ? (product.brand || 'Smartphone') : 'Acessório'}
        </span>
      </div>

      {/* Container das informações do produto */}
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">
          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>

        {/* Seção de cores (se disponível) */}
        {product.colors && product.colors.length > 0 && (
          <div className="product-colors">
            <span className="colors-label">Cores: </span>
            <div className="colors-list">
              {product.colors.slice(0, 3).map((color, index) => (
                <span key={index} className="color-tag">
                  {color}
                </span>
              ))}
              {product.colors.length > 3 && (
                <span className="color-more">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>
        )}

        {/* Rodapé com informações de estoque e botão de adicionar */}
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

// Exporta o componente ProductCard como padrão
export default ProductCard;
