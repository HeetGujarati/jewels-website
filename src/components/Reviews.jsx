import { reviews } from '../data/products';
import { StarIcon } from './Icons';
import { FadeIn, ScaleIn } from './MotionWrappers';
import Marquee from './ui/demo';

export default function Reviews() {
  const FAKE_IMAGES = [
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
  ];

  const mappedReviews = reviews.map((r, i) => ({
    name: r.author,
    handle: r.location,
    initial: r.initial,
    rating: r.rating,
    text: r.text,
    image: FAKE_IMAGES[i % FAKE_IMAGES.length],
  }));

  return (
    <section className="reviews-section" id="reviews">
      <FadeIn className="container" style={{ paddingBottom: '0' }}>
        <h2 className="section-title">What Our Customers Say</h2>
        <hr className="gold-divider" />
        <p className="section-subtitle">Real reviews from real jewellery lovers across Surat</p>

        {/* Google Rating Badge */}
        <ScaleIn delay={0.2} className="google-badge" id="google-badge">
          <div>
            <div className="google-badge-text">4.8 out of 5</div>
            <div className="google-badge-sub">Based on 320+ Google Reviews</div>
          </div>
          <div className="google-badge-stars">
            {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
          </div>
        </ScaleIn>
      </FadeIn>
      
      {/* Marquee component taking up full width */}
      <div className="w-full mt-12 pb-16">
        <Marquee row1={mappedReviews} row2={[...mappedReviews].reverse()} />
      </div>
    </section>
  );
}
