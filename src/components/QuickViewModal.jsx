import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { XIcon, WhatsAppIcon } from './Icons';
import { WHATSAPP_NUMBER } from '../config';

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart } = useStore();
  const [qty, setQty] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi, I am interested in ${product.name} (₹${product.price.toLocaleString('en-IN')}) × ${qty}`
  )}`;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
    setQty(1);
    closeQuickView();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeQuickView();
      setQty(1);
    }
  };

  return (
    <div className={`modal-overlay${quickViewProduct ? ' open' : ''}`} onClick={handleOverlayClick}>
      <div className="modal-content" style={{ position: 'relative' }}>
        <button className="modal-close" onClick={() => { closeQuickView(); setQty(1); }} aria-label="Close quick view">
          <XIcon />
        </button>

        <div className="modal-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="modal-details">
          {product.badge && <span className="product-badge" style={{ position: 'static', marginBottom: 12, display: 'inline-block' }}>{product.badge}</span>}
          <h2 className="modal-name">{product.name}</h2>
          <div className="modal-price">
            <span className="price-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            <span className="price-offer">₹{product.price.toLocaleString('en-IN')}</span>
          </div>
          <p className="modal-description">{product.description}</p>

          {/* Quantity Selector */}
          <div className="modal-qty">
            <label>Quantity:</label>
            <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">−</button>
            <span className="qty-value">{qty}</span>
            <button className="qty-btn" onClick={() => setQty(qty + 1)} aria-label="Increase quantity">+</button>
          </div>

          {/* CTA Buttons */}
          <div className="modal-actions">
            <button className="btn btn-wine" onClick={handleAddToCart}>
              Add to Cart — ₹{(product.price * qty).toLocaleString('en-IN')}
            </button>
            <a href={whatsappUrl} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon style={{ width: 18, height: 18 }} />
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
