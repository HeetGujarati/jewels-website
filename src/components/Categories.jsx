import { categories } from '../data/products';
import { FadeIn, StaggerContainer, StaggerItem } from './MotionWrappers';

export default function Categories() {
  const handleClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        const offset = 72 + 36 + 16;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="categories-section" id="categories">
      <FadeIn className="container">
        <h2 className="section-title">Shop by Category</h2>
        <hr className="gold-divider" />
        <p className="section-subtitle">Find the perfect piece for every mood, every moment</p>

        <StaggerContainer className="category-grid" id="category-grid">
          {categories.map((cat, i) => (
            <StaggerItem className="category-tile-wrapper" key={i}>
              <a href={cat.href} className="category-tile" onClick={(e) => handleClick(e, cat.href)} style={{ display: 'block' }}>
                <div className="cat-image">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                </div>
                <div className="cat-name">{cat.name}</div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </FadeIn>
    </section>
  );
}
