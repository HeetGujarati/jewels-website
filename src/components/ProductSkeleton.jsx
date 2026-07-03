export default function ProductSkeleton({ count = 4 }) {
  return Array.from({ length: count }, (_, i) => (
    <div className="product-skeleton" key={i}>
      <div className="skeleton-image skeleton-shimmer" />
      <div className="skeleton-info">
        <div className="skeleton-title skeleton-shimmer" />
        <div className="skeleton-price skeleton-shimmer" />
        <div className="skeleton-actions skeleton-shimmer" />
      </div>
    </div>
  ));
}
