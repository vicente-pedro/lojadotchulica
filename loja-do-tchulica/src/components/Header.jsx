import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { getTotalItems } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const totalItems = getTotalItems();

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <img src="/images/LogoTchulica.png" alt="Loja do Tchulica" className="logo-image" />
          <span className="logo-text">Loja do Tchulica</span>
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link home-link">Home</Link>
          <Link to="/produtos" className="nav-link">Produtos</Link>
          <Link to="/carrinho" className="nav-link cart-link">
            Carrinho
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="nav-link admin-link">Admin</Link>
              )}
              <span className="nav-link user-info">Olá, {user.username}</span>
              <button onClick={logout} className="nav-link logout-button">Sair</button>
            </>
          ) : (
            <Link to="/login" className="nav-link login-link">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
