/* ================================================================
   PRODUCT DATA — Single source of truth for all products
   ================================================================ */

export const dailyWearProducts = [
  {
    id: 'dw-1',
    name: 'Floral Pearl Pendant Set',
    price: 599,
    originalPrice: 1499,
    image: '/images/prod-1.png',
    badge: 'Bestseller',
    category: 'necklaces',
    description: 'Elegant floral pendant with lustrous pearls, perfect for daily wear. Gold-plated with anti-tarnish coating for lasting shine.',
  },
  {
    id: 'dw-2',
    name: 'Classic Gold Stud Earrings',
    price: 349,
    originalPrice: 899,
    image: '/images/prod-2.png',
    badge: 'New',
    category: 'earrings',
    description: 'Timeless gold stud earrings that complement every outfit. Lightweight, skin-friendly, and perfect for everyday elegance.',
  },
  {
    id: 'dw-3',
    name: 'Delicate Chain Bracelet',
    price: 299,
    originalPrice: 799,
    image: '/images/prod-3.png',
    badge: null,
    category: 'bangles',
    description: 'A delicate chain bracelet with subtle gold detailing. The perfect accessory for a minimal, chic look.',
  },
  {
    id: 'dw-4',
    name: 'Traditional Hoop Jhumkas',
    price: 449,
    originalPrice: 1199,
    image: '/images/prod-4.png',
    badge: 'Trending',
    category: 'earrings',
    description: 'Statement hoop jhumkas with intricate traditional design. Lightweight and comfortable for all-day wear.',
  },
  {
    id: 'dw-5',
    name: 'Layered Coin Necklace',
    price: 549,
    originalPrice: 1299,
    image: '/images/prod-5.png',
    badge: null,
    category: 'necklaces',
    description: 'Trendy layered coin necklace for a boho-chic vibe. Three delicate layers of gold-plated chains with coin pendants.',
  },
  {
    id: 'dw-6',
    name: 'Floral Adjustable Ring',
    price: 199,
    originalPrice: 599,
    image: '/images/prod-6.png',
    badge: 'New',
    category: 'rings',
    description: 'Beautiful floral ring with adjustable band. Fits all sizes, perfect as a gift or daily accessory.',
  },
  {
    id: 'dw-7',
    name: 'Temple Gold Jhumka Pair',
    price: 699,
    originalPrice: 1599,
    image: '/images/cat-earrings.png',
    badge: null,
    category: 'earrings',
    description: 'Traditional temple-style jhumkas with detailed craftsmanship. A must-have for festive occasions.',
  },
  {
    id: 'dw-8',
    name: 'Carved Gold Bangle Set',
    price: 799,
    originalPrice: 1899,
    image: '/images/cat-bangles.png',
    badge: 'Popular',
    category: 'bangles',
    description: 'Set of 4 carved gold-plated bangles with traditional motifs. Stackable and versatile.',
  },
];

export const bridalProducts = [
  {
    id: 'br-1',
    name: 'Royal Kundan Bridal Set',
    price: 3999,
    originalPrice: 8999,
    image: '/images/cat-bridal-sets.png',
    badge: 'Premium',
    category: 'bridal',
    description: 'A magnificent kundan bridal set featuring necklace, earrings, maang tikka, and haathphool. Handcrafted with precision for your special day.',
  },
  {
    id: 'br-2',
    name: 'Rani Haar Necklace Set',
    price: 3499,
    originalPrice: 7499,
    image: '/images/hero-1.png',
    badge: null,
    category: 'bridal',
    description: 'Grand rani haar with matching chandbali earrings. Multi-layered design with kundan and pearl work.',
  },
  {
    id: 'br-3',
    name: 'Temple Jhumka Statement Set',
    price: 2799,
    originalPrice: 5999,
    image: '/images/hero-4.png',
    badge: null,
    category: 'bridal',
    description: 'Oversized temple jhumkas with matching choker. Inspired by South Indian bridal traditions.',
  },
  {
    id: 'br-4',
    name: 'Polki Bangles Bridal Stack',
    price: 2999,
    originalPrice: 6499,
    image: '/images/hero-3.png',
    badge: null,
    category: 'bridal',
    description: 'Stunning polki-style bangle stack for brides. Set of 6 bangles with matching wristlet.',
  },
  {
    id: 'br-5',
    name: 'Antique Gold Choker Set',
    price: 3199,
    originalPrice: 6999,
    image: '/images/cat-necklace-sets.png',
    badge: 'Bestseller',
    category: 'bridal',
    description: 'Antique finish gold choker with matching studs. A timeless piece for the modern bride.',
  },
  {
    id: 'br-6',
    name: 'Bridal Statement Ring Set',
    price: 1799,
    originalPrice: 3999,
    image: '/images/cat-rings.png',
    badge: null,
    category: 'bridal',
    description: 'Set of 3 statement rings for the bride. Adjustable sizes with kundan and pearl detailing.',
  },
];

export const topSellers = [
  dailyWearProducts[0], // Floral Pearl Pendant
  dailyWearProducts[3], // Traditional Hoop Jhumkas
  bridalProducts[0],    // Royal Kundan Bridal Set
  dailyWearProducts[1], // Classic Gold Stud Earrings
  dailyWearProducts[7], // Carved Gold Bangle Set
  bridalProducts[4],    // Antique Gold Choker Set
  dailyWearProducts[4], // Layered Coin Necklace
  dailyWearProducts[6], // Temple Gold Jhumka Pair
];

export const categories = [
  { name: 'Daily Wear', image: '/images/cat-daily-wear.png', href: '#daily-wear', subcategories: ['Pendants', 'Studs', 'Chains'] },
  { name: 'Bridal Sets', image: '/images/cat-bridal-sets.png', href: '#bridal', subcategories: ['Kundan', 'Polki', 'Temple'] },
  { name: 'Earrings', image: '/images/cat-earrings.png', href: '#categories', subcategories: ['Studs', 'Jhumkas', 'Chandbalis'] },
  { name: 'Necklace Sets', image: '/images/cat-necklace-sets.png', href: '#categories', subcategories: ['Chokers', 'Rani Haar', 'Pendant Sets'] },
  { name: 'Bangles', image: '/images/cat-bangles.png', href: '#categories', subcategories: ['Kada', 'Thin Bangles', 'Cuffs'] },
  { name: 'Rings', image: '/images/cat-rings.png', href: '#categories', subcategories: ['Statement', 'Adjustable', 'Stacking'] },
  { name: 'Anklets', image: '/images/cat-anklets.png', href: '#categories', subcategories: ['Chain', 'Ghungroo', 'Beaded'] },
];

export const megaMenuItems = [
  {
    label: 'Daily Wear',
    href: '#daily-wear',
    subcategories: [
      { name: 'Pendants & Chains', href: '#daily-wear' },
      { name: 'Studs & Small Earrings', href: '#daily-wear' },
      { name: 'Bracelets & Rings', href: '#daily-wear' },
    ],
  },
  {
    label: 'Bridal & Heavy',
    href: '#bridal',
    subcategories: [
      { name: 'Kundan Sets', href: '#bridal' },
      { name: 'Polki Collection', href: '#bridal' },
      { name: 'Temple Jewellery', href: '#bridal' },
    ],
  },
  {
    label: 'Earrings',
    href: '#categories',
    subcategories: [
      { name: 'Jhumkas', href: '#categories' },
      { name: 'Chandbalis', href: '#categories' },
      { name: 'Studs', href: '#categories' },
    ],
  },
  {
    label: 'Necklaces',
    href: '#categories',
    subcategories: [
      { name: 'Chokers', href: '#categories' },
      { name: 'Rani Haar', href: '#categories' },
      { name: 'Pendant Sets', href: '#categories' },
    ],
  },
  {
    label: 'Bangles',
    href: '#categories',
    subcategories: [
      { name: 'Kada', href: '#categories' },
      { name: 'Thin Bangles', href: '#categories' },
      { name: 'Cuffs', href: '#categories' },
    ],
  },
  {
    label: 'Rings',
    href: '#categories',
    subcategories: [
      { name: 'Statement Rings', href: '#categories' },
      { name: 'Adjustable', href: '#categories' },
    ],
  },
  {
    label: 'Anklets',
    href: '#categories',
    subcategories: [
      { name: 'Chain Anklets', href: '#categories' },
      { name: 'Ghungroo', href: '#categories' },
    ],
  },
];

export const reviews = [
  {
    id: 1,
    author: 'Priya Patel',
    location: 'Vesu, Surat',
    initial: 'P',
    rating: 5,
    text: '"Bought the bridal set for my sister\'s wedding — everyone thought it was real gold! The quality is incredible and it hasn\'t tarnished even after 6 months. Best jewellery shop in Surat, hands down!"',
  },
  {
    id: 2,
    author: 'Meera Shah',
    location: 'Adajan, Surat',
    initial: 'M',
    rating: 5,
    text: '"I order from Jewels every month for my daily wear. The studs and bracelets are so lightweight and comfortable. The anti-tarnish coating really works — my 1-year-old pieces still look brand new!"',
  },
  {
    id: 3,
    author: 'Rina Desai',
    location: 'Varachha, Surat',
    initial: 'R',
    rating: 5,
    text: '"The home trial service for the bridal collection was amazing. They brought 10 sets to my house, and we picked the perfect one without any pressure. Very professional and friendly team."',
  },
  {
    id: 4,
    author: 'Kavita Joshi',
    location: 'Athwa, Surat',
    initial: 'K',
    rating: 4,
    text: '"Great variety and the prices are very reasonable. I got compliments on my temple jhumkas at every function. Will definitely buy more for the festive season!"',
  },
];

export const heroSlides = [
  { image: '/images/hero-bg-1.png', alt: 'Ornate gold kundan bridal necklace set on velvet — Jewels' },
  { image: '/images/hero-bg-2.png', alt: 'Beautiful Indian woman wearing traditional gold jewellery — Jewels' },
  { image: '/images/hero-bg-3.png', alt: 'Intricate meenakari craftsmanship close-up — Jewels' },
  { image: '/images/hero-bg-4.png', alt: 'Curated gold jewellery flat lay collection — Jewels' },
];
