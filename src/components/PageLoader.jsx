import { useState, useEffect } from 'react';

export default function PageLoader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`page-loader${loaded ? ' loaded' : ''}`} id="page-loader">
      <span className="loader-text">Jewels</span>
      <div className="loader-bar" />
    </div>
  );
}
