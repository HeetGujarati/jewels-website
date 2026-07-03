import { useState, useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { FadeIn, StaggerContainer, StaggerItem } from './MotionWrappers';

const budgetRanges = [
  { label: 'All', min: 0, max: Infinity },
  { label: 'Under ₹500', min: 0, max: 499 },
  { label: '₹500 – ₹1000', min: 500, max: 1000 },
  { label: '₹1000 – ₹2000', min: 1000, max: 2000 },
  { label: '₹2000+', min: 2000, max: Infinity },
];

export default function DailyWear() {
  const [activeFilter, setActiveFilter] = useState(0);
  const { setQuickView } = useStore();
  const { products: allProducts, loading } = useProducts('daily-wear');

  const filtered = useMemo(() => {
    const range = budgetRanges[activeFilter];
    return allProducts.filter(p => p.price >= range.min && p.price <= range.max);
  }, [activeFilter, allProducts]);

  return (
    <section className="categories-section" id="daily-wear">
      <FadeIn className="container">
        <h2 className="section-title">Daily Wear Collection</h2>
        <hr className="gold-divider" />
        <p className="section-subtitle">Look rich, spend smart — everyday elegance at unbeatable prices</p>

        {/* Budget Filter Chips */}
        <div className="budget-filter" id="budget-filter">
          {budgetRanges.map((range, i) => (
            <button
              key={i}
              className={`budget-chip${activeFilter === i ? ' active' : ''}`}
              onClick={() => setActiveFilter(i)}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <StaggerContainer className="product-grid" id="daily-wear-grid">
          {filtered.map(product => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} onImageClick={setQuickView} />
            </StaggerItem>
          ))}
          {filtered.length === 0 && !loading && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0', color: 'var(--ink-muted)' }}>
              No products in this price range. Try a different budget filter.
            </div>
          )}
        </StaggerContainer>
      </FadeIn>
    </section>
  );
}
