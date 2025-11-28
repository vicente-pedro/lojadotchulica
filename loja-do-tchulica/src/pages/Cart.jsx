import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useFrete } from '../hooks/useFrete';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

  const [cep, setCep] = useState("");
  const [freteValor, setFreteValor] = useState(null);
  const [fretePrazo, setFretePrazo] = useState(null);

  const { calcularFrete } = useFrete();

  const handleCalcularFrete = async () => {
    if (!cep || cep.length < 8) { alert("Digite um CEP válido!"); return; }
    const frete = await calcularFrete(cep);
    setFreteValor(frete.valor);
    setFretePrazo(String(frete.prazo));
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert('Funcionalidade de pagamento em desenvolvimento! 🚧\n\nEm breve você poderá finalizar sua compra.');
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon"></div>
        <h2>Seu carrinho está vazio</h2>
        <p>Adicione produtos para continuar comprando.</p>
        <button onClick={() => navigate('/produtos')} className="continue-shopping">Ver Produtos</button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Meu Carrinho</h1>
          <button onClick={clearCart} className="clear-cart-button">Limpar Carrinho</button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-item-category">{item.category === 'smartphone' ? (item.brand || 'Smartphone') : 'Acessório'}</p>
                  {item.selectedColor && <p className="cart-item-color">Cor: {item.selectedColor}</p>}
                  <p className="cart-item-price">R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor)} className="quantity-button">-</button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor)} className="quantity-button" disabled={item.quantity >= item.stock}>+</button>
                  </div>

                  <div className="cart-item-total"><span className="total-label">Subtotal: </span><span className="total-value">R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></div>

                  <button onClick={() => removeFromCart(item.id, item.selectedColor)} className="remove-button">Remover</button>
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Resumo do Pedido</h2>
            <div className="summary-details">
              <div className="summary-row"><span>Subtotal:</span><span>R$ {getTotalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></div>

              <div className="summary-row cep-row">
                <input type="text" placeholder="Digite seu CEP" value={cep} onChange={(e) => setCep(e.target.value)} className="cep-input" />
                <button onClick={handleCalcularFrete} className="cep-button">Calcular</button>
              </div>

              {freteValor && (
                <>
                  <div className="summary-row"><span>Frete:</span><span>R$ {freteValor}</span></div>
                  <div className="summary-row"><span>Prazo:</span><span>{fretePrazo} dias úteis</span></div>
                </>
              )}

              <div className="summary-divider"></div>

              <div className="summary-row summary-total"><span>Total:</span><span>R$ {(getTotalPrice() + (freteValor ? parseFloat(freteValor.replace(",", ".")) : 0)).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
            </div>

            <button onClick={handleCheckout} className="checkout-button">Finalizar Compra</button>
            <button onClick={() => navigate('/produtos')} className="continue-shopping-link">← Continuar Comprando</button>

            <div className="cart-benefits"><p>Envio rápido para todo Brasil.</p><p>Parcelamento em até 12x sem juros.</p><p>Garantia em todos os produtos.</p></div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
