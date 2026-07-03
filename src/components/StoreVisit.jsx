import { MapPinIcon, PhoneIcon, ClockIcon } from './Icons';
import { FadeIn, ScaleIn } from './MotionWrappers';

export default function StoreVisit() {
  return (
    <section className="store-visit" id="visit-store">
      <div className="container">
        <FadeIn>
          <h2 className="section-title">Visit Our Store</h2>
          <hr className="gold-divider" />
          <p className="section-subtitle">Experience the beauty in person — walk in, try on, fall in love</p>
        </FadeIn>

        <div className="store-visit-inner">
          <FadeIn className="store-info" delay={0.2}>
            <h3>Jewels — Surat</h3>
            <p>
              Step into our showroom and explore thousands of designs in person. Our friendly team will help you find the perfect piece for any occasion — from daily wear to your dream bridal set.
            </p>
            <div className="store-details">
              <div className="store-detail-item">
                <MapPinIcon />
                <span>Shop No. 12, Sahara Darwaja,<br />Ring Road, Surat — 395002</span>
              </div>
              <div className="store-detail-item">
                <PhoneIcon />
                <span>+91 XXXXX XXXXX</span>
              </div>
              <div className="store-detail-item">
                <ClockIcon />
                <span>Mon – Sat: 10:00 AM – 9:00 PM<br />Sunday: 11:00 AM – 7:00 PM</span>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Sahara+Darwaja+Surat"
              className="btn btn-wine"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPinIcon style={{ width: 18, height: 18 }} />
              Get Directions
            </a>
          </FadeIn>
          <ScaleIn className="store-map" delay={0.4}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.0!2d72.83!3d21.19!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDExJzI0LjAiTiA3MsKwNDknNDguMCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: 'var(--r-lg)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Jewels Store Location"
            />
          </ScaleIn>
        </div>
      </div>
    </section>
  );
}
