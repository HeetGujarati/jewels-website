import { ShieldIcon, HeartCardIcon, RefreshIcon, HomeIcon } from './Icons';
import { StaggerContainer, StaggerItem } from './MotionWrappers';

const trustItems = [
  {
    icon: ShieldIcon,
    title: 'Anti-Tarnish Guarantee',
    desc: 'Every piece is coated with our premium anti-tarnish layer — stays golden for years, not days.',
  },
  {
    icon: HeartCardIcon,
    title: 'Skin-Friendly',
    desc: '100% hypoallergenic metals — safe for all skin types, even sensitive skin. No green marks, ever.',
  },
  {
    icon: RefreshIcon,
    title: 'Easy Exchange',
    desc: 'Changed your mind? No worries — easy 7-day exchange policy on all products. No questions asked.',
  },
  {
    icon: HomeIcon,
    title: 'Free Home Trial',
    desc: 'Try before you buy — free home trial for bridal collections within Surat. See it, love it, keep it.',
  },
];

export default function TrustStrip() {
  return (
    <section className="trust-strip" id="trust-strip">
      <StaggerContainer className="trust-strip-inner">
        {trustItems.map((item, i) => (
          <StaggerItem className="trust-card" key={i}>
            <div className="trust-icon">
              <item.icon />
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
