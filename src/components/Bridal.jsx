import { useProducts } from '../hooks/useProducts';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';
import { CalendarIcon } from './Icons';
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from './MotionWrappers';
import { WHATSAPP_NUMBER } from '../config';

export default function Bridal() {
  const { setQuickView } = useStore();
  const { products: bridalProducts } = useProducts('Bridal');

  return (
    <section className="bridal-section" id="bridal">
      <FadeIn className="container">
        <h2 className="section-title">Bridal &amp; Heavy Collection</h2>
        <hr className="gold-divider" />
        <p className="section-subtitle">Statement pieces for your most special moments — crafted to steal the spotlight</p>

        <StaggerContainer className="bridal-grid" id="bridal-grid">
          {bridalProducts.map(product => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} onImageClick={setQuickView} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bridal Consultation CTA */}
        <ScaleIn delay={0.2}>
          <div className="bridal-consultation">
            <p>Planning your dream wedding look? Let our experts curate the perfect bridal set for you.</p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20would%20like%20to%20book%20a%20Bridal%20Consultation`}
              className="btn btn-gold"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CalendarIcon style={{ width: 20, height: 20 }} />
              Book a Bridal Consultation
            </a>
          </div>
        </ScaleIn>
      </FadeIn>
    </section>
  );
}
