import { StoreProvider } from './context/StoreContext';
import PageLoader from './components/PageLoader';
import GoldTicker from './components/GoldTicker';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import TopSellers from './components/TopSellers';
import Categories from './components/Categories';
import DailyWear from './components/DailyWear';
import Bridal from './components/Bridal';
import WhyChoose from './components/WhyChoose';
import Reviews from './components/Reviews';
import StoreVisit from './components/StoreVisit';
import Instagram from './components/Instagram';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import FloatingButtons from './components/FloatingButtons';

export default function App() {
  return (
    <StoreProvider>
      <PageLoader />
      <GoldTicker />
      <Header />

      <main>
        <Hero />
        <TrustStrip />
        <TopSellers />
        <Categories />
        <DailyWear />
        <Bridal />
        <WhyChoose />
        <Reviews />
        <StoreVisit />
        <Instagram />
        <FinalCTA />
      </main>

      <Footer />
      <CartDrawer />
      <QuickViewModal />
      <FloatingButtons />
    </StoreProvider>
  );
}
