import { useState, useEffect, useCallback, useRef } from 'react';
import { heroSlides } from '../data/products';
import { CheckCircleIcon } from './Icons';

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const intervalRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const goToSlide = useCallback((index) => {
    setCurrent(index);
  }, []);

  // Auto-rotate every 5s
  useEffect(() => {
    if (prefersReducedMotion) return;
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [prefersReducedMotion]);

  const handleDotClick = (index) => {
    clearInterval(intervalRef.current);
    goToSlide(index);
    if (!prefersReducedMotion) {
      intervalRef.current = setInterval(() => {
        setCurrent(prev => (prev + 1) % heroSlides.length);
      }, 5000);
    }
  };

  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const offset = 72 + 36 + 16;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home" ref={heroRef}>
      {/* Full-bleed rotating background */}
      <div className="hero-bg-slides">
        {heroSlides.map((slide, i) => (
          <div key={i} className={`hero-bg-slide${i === current ? ' active' : ''}`}>
            <img src={slide.image} alt={slide.alt} loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>

      {/* Dark gradient overlay */}
      <div className="hero-overlay" />

      {/* Hero Content — Left aligned, asymmetric, editorial */}
      <div className="hero-content">
        <span className="hero-eyebrow">SURAT'S TRUSTED JEWELLERS SINCE 2010</span>
        <p className="hero-tagline-hindi">&#x201C;जहाँ हर लुक बने ख़ास&#x201D;</p>
        <p className="hero-tagline-english">Where Every Look Becomes Special</p>
        <h1 className="hero-title">
          Timeless <span>Jewellery</span><br />
          For Every Occasion
        </h1>
        <p className="hero-description">
          Discover stunning jewellery that looks like real gold — from everyday elegance to breathtaking bridal sets. Trusted by 5000+ happy customers across Surat.
        </p>
        <div className="hero-ctas">
          <a href="#daily-wear" className="btn btn-gold" onClick={(e) => handleAnchorClick(e, '#daily-wear')}>
            Shop Daily Wear
          </a>
          <a href="#bridal" className="btn btn-outline" onClick={(e) => handleAnchorClick(e, '#bridal')}>
            View Bridal Collection
          </a>
        </div>
      </div>

      {/* Slide indicator dots */}
      <div className="hero-dots">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot${i === current ? ' active' : ''}`}
            onClick={() => handleDotClick(i)}
            aria-label={`View slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Trust glass panel at bottom */}
      <div className="hero-trust-panel">
        <div className="hero-trust-inner">
          <div className="hero-trust-item">
            <CheckCircleIcon />
            5000+ Happy Customers
          </div>
          <div className="hero-trust-item">
            <CheckCircleIcon />
            100% Anti-Tarnish
          </div>
          <div className="hero-trust-item">
            <CheckCircleIcon />
            COD Available
          </div>
          <div className="hero-trust-item">
            <CheckCircleIcon />
            Free Home Trial
          </div>
        </div>
      </div>
    </section>
  );
}
