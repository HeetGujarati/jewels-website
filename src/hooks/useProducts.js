import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { dailyWearProducts, bridalProducts, topSellers } from '../data/products';

/**
 * Maps a Supabase product row to the shape existing components expect.
 */
function mapProduct(row) {
  return {
    id: row.id,
    name: row.name,
    price: Number(row.price),
    originalPrice: row.original_price ? Number(row.original_price) : Number(row.price),
    image: row.image_url || '/images/placeholder.svg',
    badge: row.badge || null,
    category: row.category,
    description: row.description || '',
    makingCharges: row.making_charges ? Number(row.making_charges) : null,
    inStock: row.in_stock,
    isTopSeller: row.is_top_seller,
  };
}

/**
 * Fetches products from Supabase and merges with hardcoded products.
 * Hardcoded products always show; admin-added products appear alongside them.
 *
 * @param {'Bridal'|'daily-wear'|undefined} category
 */
export function useProducts(category) {
  const [supabaseProducts, setSupabaseProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        let query = supabase
          .from('products')
          .select('*')
          .eq('in_stock', true)
          .order('created_at', { ascending: false });

        if (category === 'Bridal') {
          query = query.eq('category', 'Bridal');
        } else if (category === 'daily-wear') {
          query = query.neq('category', 'Bridal');
        }

        const { data, error: fetchError } = await query;

        if (cancelled) return;

        if (fetchError) {
          // Supabase not configured or errored — just use hardcoded data
          setSupabaseProducts([]);
        } else {
          setSupabaseProducts((data || []).map(mapProduct));
        }
      } catch {
        // Network error / Supabase not configured — silently fall back
        if (!cancelled) setSupabaseProducts([]);
      }

      if (!cancelled) setLoading(false);
    }

    fetchProducts();

    return () => { cancelled = true; };
  }, [category]);

  // Pick the right hardcoded set based on category
  let hardcoded;
  if (category === 'Bridal') {
    hardcoded = bridalProducts;
  } else if (category === 'daily-wear') {
    hardcoded = dailyWearProducts;
  } else {
    hardcoded = [...dailyWearProducts, ...bridalProducts];
  }

  // Merge: hardcoded first, then admin-added products from Supabase
  const products = [...hardcoded, ...supabaseProducts];

  return { products, loading, error };
}

/**
 * Fetches top sellers: hardcoded topSellers + any Supabase products flagged as top seller.
 */
export function useTopSellers() {
  const [supabaseProducts, setSupabaseProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchTopSellers() {
      setLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from('products')
          .select('*')
          .eq('in_stock', true)
          .eq('is_top_seller', true)
          .order('created_at', { ascending: false })
          .limit(8);

        if (cancelled) return;

        if (fetchError) {
          setSupabaseProducts([]);
        } else {
          setSupabaseProducts((data || []).map(mapProduct));
        }
      } catch {
        if (!cancelled) setSupabaseProducts([]);
      }

      if (!cancelled) setLoading(false);
    }

    fetchTopSellers();

    return () => { cancelled = true; };
  }, []);

  // Merge: hardcoded top sellers + admin-flagged top sellers
  const products = [...topSellers, ...supabaseProducts];

  return { products, loading, error };
}
