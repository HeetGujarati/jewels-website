import { useStore } from '../context/StoreContext';
import { HeartIcon, WhatsAppIcon } from './Icons';
import { WHATSAPP_NUMBER } from '../config';

export default function ProductCard({ product, onImageClick }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(product.id);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi, I am interested in ${product.name} (₹${product.price.toLocaleString('en-IN')})`
  )}`;

  return (
    <div className="product-card" id={`product-${product.id}`}>
      <div className="product-image" onClick={() => onImageClick && onImageClick(product)}>
        <img src={product.image || '/images/placeholder.svg'} alt={product.name} loading="lazy" />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button
          className={`wishlist-btn${wished ? ' active' : ''}`}
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <HeartIcon filled={wished} />
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">
          <span className="price-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          <span className="price-offer">₹{product.price.toLocaleString('en-IN')}</span>
        </div>
        <div className="product-actions">
          <button className="btn btn-wine btn-sm" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
          <a href={whatsappUrl} className="btn btn-whatsapp btn-sm" target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon style={{ width: 14, height: 14 }} />
            Enquire
          </a>
        </div>
      </div>
    </div>
  );
}
