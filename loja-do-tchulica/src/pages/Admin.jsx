import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../hooks/useProducts';
import './Admin.css';

const Admin = () => {
  const { isAdmin } = useAuth();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const { products, updateProducts } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: 'smartphone', brand: '', price: 0, image: '', description: '', stock: 0, colors: undefined });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'stock' ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProduct) {
      const updatedProducts = products.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p);
      updateProducts(updatedProducts);
      setEditingProduct(null);
    } else {
      const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1,
        name: formData.name,
        category: formData.category,
        brand: formData.brand,
        price: formData.price,
        image: formData.image,
        description: formData.description,
        stock: formData.stock,
        colors: formData.colors,
      };
      const updatedProducts = [...products, newProduct];
      updateProducts(updatedProducts);
      setShowAddForm(false);
    }

    setFormData({ name: '', category: 'smartphone', brand: '', price: 0, image: '', description: '', stock: 0, colors: undefined });
  };

  const handleEdit = (product) => { setEditingProduct(product); setFormData(product); setShowAddForm(false); };
  const handleDelete = (productId) => { if (window.confirm('Tem certeza que deseja excluir este produto?')) { const updatedProducts = products.filter(p => p.id !== productId); updateProducts(updatedProducts); } };
  const handleCancel = () => { setEditingProduct(null); setShowAddForm(false); setFormData({ name: '', category: 'smartphone', brand: '', price: 0, image: '', description: '', stock: 0, colors: undefined }); };

  if (!isAdmin) return (<div className="admin-page"><div className="admin-container"><h1>Acesso Negado</h1><p>Você não tem permissão para acessar esta página.</p></div></div>);

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h1>Painel Administrativo</h1>

        <div className="admin-actions">
          <button onClick={() => setShowAddForm(true)} className="add-product-button" disabled={editingProduct !== null}>Adicionar Produto</button>
        </div>

        {(showAddForm || editingProduct) && (
          <form onSubmit={handleSubmit} className="product-form">
            <h2>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="category">Categoria</label>
                <select id="category" name="category" value={formData.category} onChange={handleInputChange} required>
                  <option value="smartphone">Smartphone</option>
                  <option value="acessorio">Acessório</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="brand">Marca</label>
                <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="price">Preço (R$)</label>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} step="0.01" min="0" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="image">URL da Imagem</label>
              <input type="url" id="image" name="image" value={formData.image} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descrição</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={3} required />
            </div>

            <div className="form-group">
              <label htmlFor="stock">Estoque</label>
              <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleInputChange} min="0" required />
            </div>

            <div className="form-group">
              <label htmlFor="colors">Cores (separadas por vírgula)</label>
              <input type="text" id="colors" name="colors" value={formData.colors ? formData.colors.join(', ') : ''} onChange={(e) => { const colors = e.target.value.split(',').map(color => color.trim()).filter(Boolean); setFormData(prev => ({ ...prev, colors: colors.length > 0 ? colors : undefined })); }} placeholder="Ex: Preto, Branco, Azul" />
            </div>

            <div className="form-actions">
              <button type="submit" className="save-button">{editingProduct ? 'Atualizar' : 'Salvar'}</button>
              <button type="button" onClick={handleCancel} className="cancel-button">Cancelar</button>
            </div>
          </form>
        )}

        <div className="products-list">
          <h2>Produtos ({products.length})</h2>
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-admin-card">
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="category">{product.category === 'smartphone' ? 'Smartphone' : 'Acessório'}</p>
                  <p className="price">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <p className="stock">Estoque: {product.stock}</p>
                </div>
                <div className="product-actions">
                  <button onClick={() => handleEdit(product)} className="edit-button">Editar</button>
                  <button onClick={() => handleDelete(product.id)} className="delete-button">Excluir</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
