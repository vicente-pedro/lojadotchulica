import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

  // Efeito para rolar para o topo quando o componente é montado
  useEffect(() => {
    // Força o scroll para o topo imediatamente quando o componente é montado
    window.scrollTo(0, 0);
  }, []);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    alert('Funcionalidade de pagamento em desenvolvimento! 🚧\n\nEm breve você poderá finalizar sua compra.');
    // Aqui você implementaria a lógica de checkout/pagamento
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon"></div>
        <h2>Seu carrinho está vazio</h2>
        <p>Adicione produtos para continuar comprando.</p>
        <button onClick={() => navigate('/produtos')} className="continue-shopping">
          Ver Produtos
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Meu Carrinho</h1>
          <button onClick={clearCart} className="clear-cart-button">
            Limpar Carrinho
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-item-category">
                    {item.category === 'smartphone' ? (item.brand || 'Smartphone') : 'Acessório'}
                  </p>
                  {item.selectedColor && (
                    <p className="cart-item-color">
                      Cor: {item.selectedColor}
                    </p>
                  )}
                  <p className="cart-item-price">
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </p>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor)}
                      className="quantity-button"
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor)}
                      className="quantity-button"
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-item-total">
                    <span className="total-label">Subtotal:  </span>
                    <span className="total-value">
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id, item.selectedColor)}
                    className="remove-button"
                    title="Remover item"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Resumo do Pedido</h2>

            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal:  </span>
                <span>R$ {getTotalPrice().toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="summary-row">
                <span>Frete:</span>
                <span className="free-shipping">Grátis</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row summary-total">
                <span>Total:  </span>
                <span>R$ {getTotalPrice().toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <button onClick={handleCheckout} className="checkout-button">
              Finalizar Compra
            </button>

            <button
              onClick={() => navigate('/produtos')}
              className="continue-shopping-link"
            >
              ← Continuar Comprando
            </button>

            <div className="cart-benefits">
              <p>Frete grátis para todo Brasil.</p>
              <p>Parcelamento em até 12x sem juros.</p>
              <p>Garantia em todos os produtos.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
