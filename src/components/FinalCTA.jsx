import { WhatsAppIcon, PhoneIcon } from './Icons';
import { FadeIn } from './MotionWrappers';
import { WHATSAPP_NUMBER } from '../config';

export default function FinalCTA() {
  return (
    <section className="final-cta" id="contact">
      <FadeIn className="container">
        <div className="final-cta-inner">
          <h2>Visit Us Today or Order on WhatsApp</h2>
          <p>The perfect jewellery for every occasion is just a message away. Talk to us now!</p>
          <div className="final-cta-buttons">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20am%20interested%20in%20your%20jewellery%20collection`}
              className="btn btn-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              id="cta-final-whatsapp"
            >
              <WhatsAppIcon style={{ width: 22, height: 22 }} />
              Order on WhatsApp
            </a>
            <a href={`tel:+${WHATSAPP_NUMBER}`} className="btn-phone" id="cta-final-phone">
              <PhoneIcon style={{ width: 20, height: 20 }} />
              Call Us Now
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
