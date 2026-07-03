import { useState, useEffect } from 'react';
import { WhatsAppIcon, ChevronUpIcon } from './Icons';
import { WHATSAPP_NUMBER } from '../config';

export default function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20am%20interested%20in%20your%20jewellery%20collection`}
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        id="whatsapp-float"
      >
        <WhatsAppIcon />
      </a>

      {/* Back to Top */}
      <button
        className={`back-to-top${showBackToTop ? ' visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
        id="back-to-top"
      >
        <ChevronUpIcon />
      </button>
    </>
  );
}
