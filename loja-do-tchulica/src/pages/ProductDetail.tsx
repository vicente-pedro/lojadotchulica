import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

// Componente para exibir detalhes de um produto específico
const ProductDetail = () => {
  // Obtém o ID do produto da URL
  const { id } = useParams<{ id: string }>();
  // Hook para navegação programática
  const navigate = useNavigate();
  // Hook para adicionar produtos ao carrinho
  const { addToCart } = useCart();
  // Hook para obter a lista de produtos
  const { products } = useProducts();
  // Estado para controlar a cor selecionada
  const [selectedColor, setSelectedColor] = useState<string>('');

  // Efeito para rolar para o topo quando o componente é montado
  useEffect(() => {
    // Força o scroll para o topo imediatamente quando o componente é montado
    window.scrollTo(0, 0);
  }, []);

  // Encontra o produto pelo ID
  const product = products.find(p => p.id === Number(id));

  // Se o produto não for encontrado, exibe mensagem de erro
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Produto não encontrado</h2>
        <button onClick={() => navigate('/produtos')} className="back-button">
          Voltar para produtos
        </button>
      </div>
    );
  }

  // Função para adicionar produto ao carrinho
  const handleAddToCart = () => {
    // Verifica se uma cor foi selecionada para produtos que têm cores
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert('Por favor, selecione uma cor antes de adicionar ao carrinho.');
      return;
    }
    // Adiciona o produto ao carrinho
    addToCart(product, selectedColor);
    alert(`${product.name}${selectedColor ? ` (${selectedColor})` : ''} adicionado ao carrinho!`);
  };

  // Filtra produtos relacionados (mesma categoria, excluindo o produto atual)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // Renderiza a página de detalhes do produto
  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        {/* Botão para voltar à página anterior */}
        <button onClick={() => navigate(-1)} className="back-link">
          ← Voltar
        </button>

        {/* Conteúdo principal da página */}
        <div className="product-detail-content">
          {/* Seção da imagem do produto */}
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
            <span className={`product-badge ${product.category}`}>
              {product.category === 'smartphone' ? 'Smartphone' : 'Acessório'}
            </span>
          </div>

          {/* Seção de informações do produto */}
          <div className="product-detail-info">
            <h1>{product.name}</h1>

            {/* Seção de preço */}
            <div className="product-price-section">
              <span className="product-price-label">Preço: </span>
              <span className="product-price-value">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
            </div>

            {/* Seção de estoque */}
            <div className="product-stock-section">
              {product.stock > 0 ? (
                <span className="stock-available">
                  ✓ {product.stock} unidades disponíveis
                </span>
              ) : (
                <span className="stock-unavailable">
                  ✗ Produto esgotado
                </span>
              )}
            </div>

            {/* Seção de seleção de cores (se disponível) */}
            {product.colors && product.colors.length > 0 && (
              <div className="product-colors-section">
                <h3>Cores Disponíveis</h3>
                <div className="colors-selection">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
                {selectedColor && (
                  <p className="selected-color-display">
                    Cor selecionada: <strong>{selectedColor}</strong>
                  </p>
                )}
              </div>
            )}

            {/* Seção de ações (adicionar ao carrinho) */}
            <div className="product-actions">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="add-to-cart-button"
              >
                Adicionar ao Carrinho
              </button>
              <button
                onClick={() => navigate('/produtos')}
                className="continue-shopping-button"
              >
                Continuar Comprando
              </button>
            </div>

            {/* Seção de descrição */}
            <div className="product-description">
              <h3>Descrição</h3>
              <p>{product.description}</p>
            </div>

            {/* Seção de características */}
            <div className="product-features">
              <h3>Características</h3>
              <ul>
                <li>Produto original.</li>
                <li>Garantia de fábrica.</li>
                <li>Entrega rápida.</li>
                <li>Parcelamento sem juros.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Seção de produtos relacionados */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>Produtos Relacionados</h2>
            <div className="related-products-grid">
              {relatedProducts.map(relatedProduct => (
                <div
                  key={relatedProduct.id}
                  className="related-product-card"
                  onClick={() => navigate(`/produto/${relatedProduct.id}`)}
                >
                  <img src={relatedProduct.image} alt={relatedProduct.name} />
                  <h4>{relatedProduct.name}</h4>
                  <p className="related-price">
                    R$ {relatedProduct.price.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Exporta o componente ProductDetail como padrão
export default ProductDetail;
