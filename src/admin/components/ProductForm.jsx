import { useState, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';

const CATEGORIES = ['Necklace', 'Earrings', 'Bangles', 'Ring', 'Anklets', 'Bridal', 'Other'];
const BADGES = ['', 'Bestseller', 'New', 'Trending', 'Popular', 'Premium'];

export default function ProductForm({ product, onClose, onSave, showToast }) {
  const isEdit = Boolean(product);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: product?.name || '',
    price: product?.price || '',
    original_price: product?.original_price || '',
    making_charges: product?.making_charges || '',
    category: product?.category || 'Necklace',
    description: product?.description || '',
    badge: product?.badge || '',
    in_stock: product?.in_stock ?? true,
    is_top_seller: product?.is_top_seller ?? false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(product?.image_url || null);
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file.', 'error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image must be under 5MB.', 'error');
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (file) => {
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name.trim()) {
      showToast('Product name is required.', 'error');
      return;
    }
    if (!form.price || Number(form.price) <= 0) {
      showToast('Valid price is required.', 'error');
      return;
    }

    setSaving(true);

    try {
      let imageUrl = product?.image_url || null;

      // Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);

        // Delete old image from storage if replacing
        if (isEdit && product.image_url) {
          try {
            const url = new URL(product.image_url);
            const pathParts = url.pathname.split('/product-images/');
            if (pathParts.length > 1) {
              const filePath = decodeURIComponent(pathParts[1]);
              await supabase.storage.from('product-images').remove([filePath]);
            }
          } catch {
            // Ignore old image cleanup errors
          }
        }
      }

      const productData = {
        name: form.name.trim(),
        price: Number(form.price),
        original_price: form.original_price ? Number(form.original_price) : null,
        making_charges: form.making_charges ? Number(form.making_charges) : null,
        category: form.category,
        description: form.description.trim() || null,
        badge: form.badge || null,
        image_url: imageUrl,
        in_stock: form.in_stock,
        is_top_seller: form.is_top_seller,
      };

      let error;

      if (isEdit) {
        ({ error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id));
      } else {
        ({ error } = await supabase
          .from('products')
          .insert([productData]));
      }

      if (error) throw error;

      showToast(isEdit ? 'Product updated successfully!' : 'Product added successfully!');
      onSave();
    } catch (err) {
      showToast('Error: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <h2>{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              {/* Name */}
              <div className="form-group full-width">
                <label htmlFor="product-name">Product Name *</label>
                <input
                  id="product-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g. Royal Kundan Bridal Set"
                  required
                />
              </div>

              {/* Price */}
              <div className="form-group">
                <label htmlFor="product-price">Selling Price (₹) *</label>
                <input
                  id="product-price"
                  type="number"
                  min="0"
                  step="1"
                  value={form.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder="599"
                  required
                />
              </div>

              {/* Original Price */}
              <div className="form-group">
                <label htmlFor="product-original-price">Original Price (₹)</label>
                <input
                  id="product-original-price"
                  type="number"
                  min="0"
                  step="1"
                  value={form.original_price}
                  onChange={(e) => handleChange('original_price', e.target.value)}
                  placeholder="1499 (strikethrough)"
                />
              </div>

              {/* Making Charges */}
              <div className="form-group">
                <label htmlFor="product-making">Making Charges (₹)</label>
                <input
                  id="product-making"
                  type="number"
                  min="0"
                  step="1"
                  value={form.making_charges}
                  onChange={(e) => handleChange('making_charges', e.target.value)}
                  placeholder="Optional"
                />
              </div>

              {/* Category */}
              <div className="form-group">
                <label htmlFor="product-category">Category *</label>
                <select
                  id="product-category"
                  value={form.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Badge */}
              <div className="form-group">
                <label htmlFor="product-badge">Badge</label>
                <select
                  id="product-badge"
                  value={form.badge}
                  onChange={(e) => handleChange('badge', e.target.value)}
                >
                  {BADGES.map(b => (
                    <option key={b} value={b}>{b || 'None'}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="form-group full-width">
                <label htmlFor="product-desc">Description</label>
                <textarea
                  id="product-desc"
                  value={form.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Describe this product..."
                  rows={3}
                />
              </div>

              {/* Image Upload */}
              <div className="form-group full-width">
                <label>Product Image</label>
                <div
                  className="image-upload-area"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <div className="image-upload-label">
                    <strong>Click to upload</strong> or drag and drop<br />
                    PNG, JPG, WebP (max 5MB)
                  </div>
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Preview" />
                    </div>
                  )}
                </div>
              </div>

              {/* Toggles */}
              <div className="form-group">
                <label>In Stock</label>
                <div className="toggle-group">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={form.in_stock}
                      onChange={(e) => handleChange('in_stock', e.target.checked)}
                    />
                    <span className="toggle-slider" />
                  </label>
                  <span className="toggle-label">
                    {form.in_stock ? 'Available for sale' : 'Hidden from store'}
                  </span>
                </div>
              </div>

              <div className="form-group">
                <label>Top Seller</label>
                <div className="toggle-group">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={form.is_top_seller}
                      onChange={(e) => handleChange('is_top_seller', e.target.checked)}
                    />
                    <span className="toggle-slider" />
                  </label>
                  <span className="toggle-label">
                    {form.is_top_seller ? 'Featured in Top Sellers' : 'Not featured'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="form-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save" disabled={saving}>
              {saving ? 'Saving...' : (isEdit ? 'Update Product' : 'Add Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
