import { useStore } from '../context/StoreContext';
import { XIcon, TrashIcon, CartIcon, WhatsAppIcon } from './Icons';

export default function CartDrawer() {
  const {
    cart, cartOpen, closeCart,
    updateQuantity, removeFromCart,
    cartCount, cartSubtotal,
    getWhatsAppCheckoutUrl,
  } = useStore();

  return (
    <>
      {/* Overlay */}
      <div className={`cart-overlay${cartOpen ? ' open' : ''}`} onClick={closeCart} />

      {/* Drawer */}
      <div className={`cart-drawer${cartOpen ? ' open' : ''}`} id="cart-drawer">
        {/* Header */}
        <div className="cart-header">
          <h3>Your Cart ({cartCount})</h3>
          <button className="cart-close" onClick={closeCart} aria-label="Close cart">
            <XIcon />
          </button>
        </div>

        {/* Items */}
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <CartIcon style={{ width: 48, height: 48 }} />
              <p>Your cart is empty</p>
              <p style={{ fontSize: '0.82rem', marginTop: 8, color: 'var(--ink-muted)' }}>
                Add items to get started
              </p>
            </div>
          ) : (
            cart.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <img src={item.image || '/images/placeholder.svg'} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                  <div className="cart-item-qty">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                      disabled={item.quantity <= 1}
                      style={{ opacity: item.quantity <= 1 ? 0.3 : 1, cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer' }}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  <TrashIcon />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>
            <a
              href={getWhatsAppCheckoutUrl()}
              className="btn btn-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <WhatsAppIcon style={{ width: 20, height: 20 }} />
              Checkout on WhatsApp
            </a>
          </div>
        )}
      </div>
    </>
  );
}
