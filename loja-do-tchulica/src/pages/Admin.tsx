import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import type { Product } from '../types';
import { useProducts } from '../hooks/useProducts';
import './Admin.css';

// Componente para o painel administrativo de gerenciamento de produtos
const Admin: React.FC = () => {
  // Verifica se o usuário é administrador
  const { isAdmin } = useAuth();

  // Efeito para rolar para o topo quando o componente é montado
  useEffect(() => {
    // Força o scroll para o topo imediatamente quando o componente é montado
    window.scrollTo(0, 0);
  }, []);
  // Hook para gerenciar produtos
  const { products, updateProducts } = useProducts();
  // Estado para controlar o produto sendo editado
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  // Estado para controlar a exibição do formulário de adição
  const [showAddForm, setShowAddForm] = useState(false);
  // Estado para os dados do formulário
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: 'smartphone',
    brand: '',
    price: 0,
    image: '',
    description: '',
    stock: 0,
    colors: undefined,
  });

  // Função para lidar com mudanças nos inputs do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  // Função para submeter o formulário (adicionar ou editar produto)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProduct) {
      // Atualizar produto existente
      const updatedProducts = products.map(p =>
        p.id === editingProduct.id ? { ...p, ...formData } : p
      );
      updateProducts(updatedProducts);
      setEditingProduct(null);
    } else {
      // Adicionar novo produto
      const newProduct: Product = {
        id: Math.max(...products.map(p => p.id)) + 1,
        name: formData.name!,
        category: formData.category as 'smartphone' | 'acessorio',
        brand: formData.brand,
        price: formData.price!,
        image: formData.image!,
        description: formData.description!,
        stock: formData.stock!,
        colors: formData.colors,
      };
      const updatedProducts = [...products, newProduct];
      updateProducts(updatedProducts);
      setShowAddForm(false);
    }

    // Resetar formulário
    setFormData({
      name: '',
      category: 'smartphone',
      brand: '',
      price: 0,
      image: '',
      description: '',
      stock: 0,
      colors: undefined,
    });
  };

  // Função para iniciar edição de um produto
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowAddForm(false);
  };

  // Função para excluir um produto
  const handleDelete = (productId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      updateProducts(updatedProducts);
    }
  };

  // Função para cancelar edição ou adição
  const handleCancel = () => {
    setEditingProduct(null);
    setShowAddForm(false);
    setFormData({
      name: '',
      category: 'smartphone',
      brand: '',
      price: 0,
      image: '',
      description: '',
      stock: 0,
      colors: undefined,
    });
  };

  // Verificar se usuário é admin
  if (!isAdmin) {
    return (
      <div className="admin-page">
        <div className="admin-container">
          <h1>Acesso Negado</h1>
          <p>Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    );
  }

  // Renderiza a interface do painel administrativo
  return (
    <div className="admin-page">
      <div className="admin-container">
        <h1>Painel Administrativo</h1>

        <div className="admin-actions">
          <button
            onClick={() => setShowAddForm(true)}
            className="add-product-button"
            disabled={editingProduct !== null}
          >
            Adicionar Produto
          </button>
        </div>

        {/* Formulário para adicionar ou editar produto */}
        {(showAddForm || editingProduct) && (
          <form onSubmit={handleSubmit} className="product-form">
            <h2>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Categoria</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="smartphone">Smartphone</option>
                  <option value="acessorio">Acessório</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="brand">Marca</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Preço (R$)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="image">URL da Imagem</label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descrição</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="stock">Estoque</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="colors">Cores (separadas por vírgula)</label>
              <input
                type="text"
                id="colors"
                name="colors"
                value={formData.colors ? formData.colors.join(', ') : ''}
                onChange={(e) => {
                  const colors = e.target.value.split(',').map(color => color.trim()).filter(color => color);
                  setFormData(prev => ({
                    ...prev,
                    colors: colors.length > 0 ? colors : undefined
                  }));
                }}
                placeholder="Ex: Preto, Branco, Azul"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="save-button">
                {editingProduct ? 'Atualizar' : 'Salvar'}
              </button>
              <button type="button" onClick={handleCancel} className="cancel-button">
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* Lista de produtos */}
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
                  <button onClick={() => handleEdit(product)} className="edit-button">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="delete-button">
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporta o componente Admin como padrão
export default Admin;
