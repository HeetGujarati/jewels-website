import { InstagramIcon } from './Icons';
import { FadeIn, StaggerContainer, StaggerItem } from './MotionWrappers';

const instaImages = [
  { src: '/images/prod-1.png', alt: 'Instagram post — Floral pendant' },
  { src: '/images/prod-4.png', alt: 'Instagram post — Traditional jhumkas' },
  { src: '/images/cat-daily-wear.png', alt: 'Instagram post — Daily wear collection' },
  { src: '/images/prod-2.png', alt: 'Instagram post — Gold studs' },
  { src: '/images/cat-necklace-sets.png', alt: 'Instagram post — Necklace sets' },
  { src: '/images/cat-bridal-sets.png', alt: 'Instagram post — Bridal collection' },
];

export default function Instagram() {
  return (
    <section className="instagram-section" id="instagram">
      <FadeIn className="container">
        <h2 className="section-title">Follow Us on Instagram</h2>
        <hr className="gold-divider" />
        <p className="section-subtitle">Stay updated with our latest designs, offers, and behind-the-scenes</p>

        <StaggerContainer className="insta-grid">
          {instaImages.map((img, i) => (
            <StaggerItem key={i}>
              <a href="https://instagram.com/jewels" className="insta-item" target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
                <img src={img.src} alt={img.alt} loading="lazy" />
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn className="insta-cta" delay={0.4}>
          <a href="https://instagram.com/jewels" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
            Follow @jewels
          </a>
        </FadeIn>
      </FadeIn>
    </section>
  );
}
