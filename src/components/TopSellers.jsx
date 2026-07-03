import { useStore } from '../context/StoreContext';
import { useTopSellers } from '../hooks/useProducts';
import { FadeIn, StaggerContainer, StaggerItem } from './MotionWrappers';

export default function TopSellers() {
  const { setQuickView } = useStore();
  const { products: topSellerProducts } = useTopSellers();

  return (
    <section className="top-sellers" id="top-sellers">
      <FadeIn className="container">
        <h2 className="section-title">Top Sellers</h2>
        <hr className="gold-divider" />
        <p className="section-subtitle">Our most loved pieces — handpicked favourites from thousands of happy customers</p>
      </FadeIn>
      <StaggerContainer className="top-sellers-scroll">
        {topSellerProducts.map((product) => (
          <StaggerItem className="top-seller-card" key={product.id} onClick={() => setQuickView(product)}>
            <div className="ts-image">
              <img src={product.image || '/images/placeholder.svg'} alt={product.name} loading="lazy" />
            </div>
            <div className="ts-info">
              <div className="ts-name">{product.name}</div>
              <div className="ts-price">
                <span className="price-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                <span className="price-offer">₹{product.price.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
