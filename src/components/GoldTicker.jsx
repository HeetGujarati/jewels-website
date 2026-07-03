export default function GoldTicker() {
  return (
    <div className="gold-ticker" id="gold-ticker">
      <span className="ticker-label">Today's Gold Rate</span>
      <span className="ticker-dot" />
      <span><span className="ticker-label">22KT:</span> <span className="ticker-rate">₹7,150/g</span></span>
      <span className="ticker-dot" />
      <span><span className="ticker-label">24KT:</span> <span className="ticker-rate">₹7,800/g</span></span>
      <span className="ticker-dot" />
      <span className="ticker-label">Updated today</span>
    </div>
  );
}
