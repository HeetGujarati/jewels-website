import { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { LogoIcon, CartIcon, HeartIcon, WhatsAppIcon, ChevronDownIcon } from './Icons';
import { megaMenuItems } from '../data/products';
import { WHATSAPP_NUMBER } from '../config';

export default function Header() {
  const { cartCount, wishlistCount, toggleCart } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileAccordion(null);
    document.body.style.overflow = '';
  };

  const openMobile = () => {
    setMobileOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const toggleMobileAccordion = (i) => {
    setMobileAccordion(mobileAccordion === i ? null : i);
  };

  const handleAnchorClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      closeMobile();
      const el = document.querySelector(href);
      if (el) {
        const offset = (headerRef.current?.offsetHeight || 72) + 36 + 16;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className={`site-header${scrolled ? ' scrolled' : ''}`} id="site-header" ref={headerRef}>
        <div className="header-inner">
          {/* Logo */}
          <a href="#home" className="logo" onClick={(e) => handleAnchorClick(e, '#home')}>
            <LogoIcon className="logo-icon" />
            <span className="logo-text">Jewels</span>
          </a>

          {/* Desktop Nav */}
          <nav className="main-nav">
            <ul className="nav-links">
              {megaMenuItems.map((item, i) => (
                <li className="nav-link-item" key={i}>
                  <a href={item.href} onClick={(e) => handleAnchorClick(e, item.href)}>
                    {item.label}
                    <ChevronDownIcon className="chevron" />
                  </a>
                  <div className="mega-dropdown">
                    {item.subcategories.map((sub, j) => (
                      <a href={sub.href} key={j} onClick={(e) => handleAnchorClick(e, sub.href)}>
                        {sub.name}
                      </a>
                    ))}
                  </div>
                </li>
              ))}
            </ul>

            {/* Header Icons */}
            <div className="header-icons">
              <button className="header-icon-btn" aria-label="Wishlist" title="Wishlist" onClick={() => alert('Wishlist feature coming soon!')}>
                <HeartIcon />
                {wishlistCount > 0 && <span className="icon-badge">{wishlistCount}</span>}
              </button>
              <button className="header-icon-btn" onClick={toggleCart} aria-label="Shopping Cart" title="Cart">
                <CartIcon />
                {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20am%20interested%20in%20your%20jewellery%20collection`}
                className="btn btn-whatsapp btn-sm hide-mobile"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: 8 }}
              >
                <WhatsAppIcon style={{ width: 16, height: 16 }} />
                <span className="hide-mobile-text">Order on WhatsApp</span>
              </a>
            </div>

            {/* Hamburger */}
            <button
              className={`hamburger${mobileOpen ? ' active' : ''}`}
              onClick={mobileOpen ? closeMobile : openMobile}
              aria-label="Toggle navigation menu"
            >
              <span /><span /><span />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav-overlay${mobileOpen ? ' active' : ''}`} onClick={closeMobile} />

      {/* Mobile Nav Drawer */}
      <nav className={`mobile-nav${mobileOpen ? ' active' : ''}`}>
        {megaMenuItems.map((item, i) => (
          <div key={i}>
            <div className="mobile-nav-link" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => toggleMobileAccordion(i)}>
              <a href={item.href} onClick={(e) => { e.stopPropagation(); handleAnchorClick(e, item.href); }}>
                {item.label}
              </a>
              <ChevronDownIcon style={{
                width: 16, height: 16,
                transform: mobileAccordion === i ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
              }} />
            </div>
            <div className={`mobile-mega-sub${mobileAccordion === i ? ' open' : ''}`}>
              {item.subcategories.map((sub, j) => (
                <a href={sub.href} key={j} onClick={(e) => handleAnchorClick(e, sub.href)}>
                  {sub.name}
                </a>
              ))}
            </div>
          </div>
        ))}
        <div style={{ marginTop: 20 }}>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20am%20interested%20in%20your%20jewellery%20collection`}
            className="btn btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <WhatsAppIcon style={{ width: 20, height: 20 }} />
            Order on WhatsApp
          </a>
        </div>
      </nav>
    </>
  );
}
