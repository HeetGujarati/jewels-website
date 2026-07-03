import { LogoIcon, InstagramIcon, FacebookIcon, WhatsAppIcon, YoutubeIcon, MapPinIcon, PhoneIcon, MailIcon } from './Icons';
import { WHATSAPP_NUMBER } from '../config';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <span className="logo-text" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>Jewels</span>
            <p>Premium jewellery for every occasion — bridal, festive, and everyday elegance. Trusted by thousands of happy customers across Surat and Gujarat.</p>
            <div className="footer-social">
              <a href="https://instagram.com/jewels" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                <InstagramIcon />
              </a>
              <a href="https://facebook.com/jewels" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
                <WhatsAppIcon style={{ width: 18, height: 18 }} />
              </a>
              <a href="https://youtube.com/@jewels" target="_blank" rel="noopener noreferrer" aria-label="Subscribe on YouTube">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#categories">Collections</a>
            <a href="#daily-wear">Daily Wear</a>
            <a href="#bridal">Bridal Collection</a>
            <a href="#reviews">Reviews</a>
            <a href="#visit-store">Visit Us</a>
          </div>

          {/* Policies */}
          <div className="footer-col">
            <h4>Policies</h4>
            <a href="#why-choose">About Us</a>
            <a href="#">Exchange Policy</a>
            <a href="#">Shipping Info</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="footer-contact-item">
              <MapPinIcon />
              <span>Shop No. 12, Sahara Darwaja,<br />Ring Road, Surat — 395002</span>
            </div>
            <div className="footer-contact-item">
              <PhoneIcon />
              <span>+91 XXXXX XXXXX</span>
            </div>
            <div className="footer-contact-item">
              <MailIcon />
              <span>hello@jewels.com</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <span>&copy; 2025 Jewels. All rights reserved.</span>
          <span>Crafted with love in Surat</span>
        </div>
      </div>
    </footer>
  );
}
