import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ProductForm from './ProductForm';
import DeleteConfirm from './DeleteConfirm';

export default function Dashboard({ session, onLogout, showToast }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      showToast('Failed to load products: ' + error.message, 'error');
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddClick = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleFormSave = async () => {
    handleFormClose();
    await fetchProducts();
  };

  const handleDeleteClick = (product) => {
    setDeleteTarget(product);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    // Delete product image from storage if exists
    if (deleteTarget.image_url) {
      try {
        const url = new URL(deleteTarget.image_url);
        const pathParts = url.pathname.split('/product-images/');
        if (pathParts.length > 1) {
          const filePath = decodeURIComponent(pathParts[1]);
          await supabase.storage.from('product-images').remove([filePath]);
        }
      } catch {
        // Ignore storage delete errors — proceed with product deletion
      }
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', deleteTarget.id);

    if (error) {
      showToast('Failed to delete product: ' + error.message, 'error');
    } else {
      showToast('Product deleted successfully.');
      await fetchProducts();
    }
    setDeleteTarget(null);
  };

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
  };

  // Stats
  const totalProducts = products.length;
  const inStockCount = products.filter(p => p.in_stock).length;
  const outOfStockCount = totalProducts - inStockCount;
  const topSellerCount = products.filter(p => p.is_top_seller).length;

  return (
    <div className="admin-layout">
      {/* Top Bar */}
      <header className="admin-topbar">
        <div className="admin-topbar-brand">
          Laxmi Jewels <span>Admin</span>
        </div>
        <div className="admin-topbar-right">
          <span className="admin-user-email">{session.user.email}</span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>

      {/* Content */}
      <div className="admin-content">
        {/* Stats */}
        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-number">{totalProducts}</div>
            <div className="stat-label">Total Products</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{inStockCount}</div>
            <div className="stat-label">In Stock</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{outOfStockCount}</div>
            <div className="stat-label">Out of Stock</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{topSellerCount}</div>
            <div className="stat-label">Top Sellers</div>
          </div>
        </div>

        {/* Actions */}
        <div className="admin-actions">
          <h2>All Products</h2>
          <button className="add-product-btn" onClick={handleAddClick}>
            + Add New Product
          </button>
        </div>

        {/* Product Table */}
        <div className="product-table-wrapper">
          {loading ? (
            <div className="admin-loading">
              <div className="spinner" />
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="table-empty">
              <p>No products yet. Click "Add New Product" to get started.</p>
            </div>
          ) : (
            <table className="product-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.image_url || '/images/placeholder.svg'}
                        alt={product.name}
                        className="table-thumb"
                      />
                    </td>
                    <td>
                      <strong>{product.name}</strong>
                      {product.badge && (
                        <span className="table-badge badge-top-seller" style={{ marginLeft: 8 }}>
                          {product.badge}
                        </span>
                      )}
                      {product.is_top_seller && (
                        <span className="table-badge badge-top-seller" style={{ marginLeft: 4 }}>
                          ★ Top Seller
                        </span>
                      )}
                    </td>
                    <td>{product.category}</td>
                    <td>
                      {product.original_price && (
                        <span style={{ textDecoration: 'line-through', color: 'var(--ink-muted)', fontSize: '0.8rem', marginRight: 6 }}>
                          ₹{Number(product.original_price).toLocaleString('en-IN')}
                        </span>
                      )}
                      <strong>₹{Number(product.price).toLocaleString('en-IN')}</strong>
                    </td>
                    <td>
                      <span className={`table-badge ${product.in_stock ? 'badge-in-stock' : 'badge-out-of-stock'}`}>
                        {product.in_stock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="table-btn table-btn-edit"
                          onClick={() => handleEditClick(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="table-btn table-btn-delete"
                          onClick={() => handleDeleteClick(product)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={handleFormClose}
          onSave={handleFormSave}
          showToast={showToast}
        />
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <DeleteConfirm
          productName={deleteTarget.name}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
}
