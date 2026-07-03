import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { WHATSAPP_NUMBER } from '../config';

/* ================================================================
   STORE CONTEXT — Cart + Wishlist
   ================================================================ */

const StoreContext = createContext(null);

const getInitialCart = () => {
  try {
    const item = window.sessionStorage.getItem('laxmi_cart');
    return item ? JSON.parse(item) : [];
  } catch (error) {
    return [];
  }
};

const initialState = {
  cart: getInitialCart(), // initialize from sessionStorage
  wishlist: [],           // product ids
  cartOpen: false,
  quickViewProduct: null,
};

function storeReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find(item => item.id === action.product.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          cartOpen: true,
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.product, quantity: 1 }],
        cartOpen: true,
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.id),
      };

    case 'UPDATE_QUANTITY': {
      // Enforce minimum quantity of 1
      const qty = Math.max(1, action.quantity);
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.id ? { ...item, quantity: qty } : item
        ),
      };
    }

    case 'TOGGLE_CART':
      return { ...state, cartOpen: !state.cartOpen };

    case 'CLOSE_CART':
      return { ...state, cartOpen: false };

    case 'OPEN_CART':
      return { ...state, cartOpen: true };

    case 'TOGGLE_WISHLIST': {
      const isWished = state.wishlist.includes(action.id);
      return {
        ...state,
        wishlist: isWished
          ? state.wishlist.filter(id => id !== action.id)
          : [...state.wishlist, action.id],
      };
    }

    case 'SET_QUICK_VIEW':
      return { ...state, quickViewProduct: action.product };

    case 'CLOSE_QUICK_VIEW':
      return { ...state, quickViewProduct: null };

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  // Persist cart to sessionStorage whenever it changes
  useEffect(() => {
    try {
      window.sessionStorage.setItem('laxmi_cart', JSON.stringify(state.cart));
    } catch (error) {
      // Ignore write errors
    }
  }, [state.cart]);

  const addToCart = useCallback((product) => {
    dispatch({ type: 'ADD_TO_CART', product: { id: product.id, name: product.name, price: product.price, image: product.image } });
  }, []);

  const removeFromCart = useCallback((id) => {
    dispatch({ type: 'REMOVE_FROM_CART', id });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  }, []);

  const toggleCart = useCallback(() => {
    dispatch({ type: 'TOGGLE_CART' });
  }, []);

  const closeCart = useCallback(() => {
    dispatch({ type: 'CLOSE_CART' });
  }, []);

  const openCart = useCallback(() => {
    dispatch({ type: 'OPEN_CART' });
  }, []);

  const toggleWishlist = useCallback((id) => {
    dispatch({ type: 'TOGGLE_WISHLIST', id });
  }, []);

  const isWishlisted = useCallback((id) => {
    return state.wishlist.includes(id);
  }, [state.wishlist]);

  const setQuickView = useCallback((product) => {
    dispatch({ type: 'SET_QUICK_VIEW', product });
  }, []);

  const closeQuickView = useCallback(() => {
    dispatch({ type: 'CLOSE_QUICK_VIEW' });
  }, []);

  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const wishlistCount = state.wishlist.length;

  // Generate WhatsApp checkout message
  const getWhatsAppCheckoutUrl = useCallback(() => {
    if (state.cart.length === 0) return '#';
    
    let message = "Hi! I'd like to order the following:\n\n";
    
    state.cart.forEach((item, i) => {
      message += `${i + 1}. ${item.name} — Qty: ${item.quantity} — ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n`;
    });
    
    message += `\nSubtotal: ₹${cartSubtotal.toLocaleString('en-IN')}\n\nPlease confirm availability and delivery details.`;
    
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [state.cart, cartSubtotal]);

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    closeCart,
    openCart,
    toggleWishlist,
    isWishlisted,
    setQuickView,
    closeQuickView,
    cartCount,
    cartSubtotal,
    wishlistCount,
    getWhatsAppCheckoutUrl,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}
