import { useState, useEffect, useCallback, useRef } from "react";
import { getCache, setCache } from "../lib/cache";

export interface UseQueryOptions {
  /** TTL in milliseconds (default: 60_000 = 1 min) */
  ttl?: number;
  /** If false, the query will not run automatically (default: true) */
  enabled?: boolean;
}

export interface UseQueryResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  /** Manually refetch, bypassing the cache */
  refetch: () => Promise<void>;
}

/**
 * Generic cached data hook.
 *
 * On mount:
 *  1. Returns cached data immediately (no loading flash) if still fresh.
 *  2. Otherwise fetches from network, caches result, updates state.
 *
 * Usage:
 *   const { data, loading, error } = useQuery("dept:summary", getDepartmentSummary, { ttl: 120_000 });
 */
export function useQuery<T>(
  cacheKey: string,
  fetcherFn: () => Promise<T>,
  options: UseQueryOptions = {},
): UseQueryResult<T> {
  const { ttl = 60_000, enabled = true } = options;

  // Check cache synchronously so the initial render already has data if available
  const cachedInitial = getCache<T>(cacheKey);

  const [data, setData] = useState<T | null>(cachedInitial);
  const [loading, setLoading] = useState<boolean>(!cachedInitial && enabled);
  const [error, setError] = useState<string | null>(null);

  // Keep a stable ref so the execute fn doesn't re-create repeatedly
  const fetcherRef = useRef(fetcherFn);
  fetcherRef.current = fetcherFn;
  const cacheKeyRef = useRef(cacheKey);
  cacheKeyRef.current = cacheKey;
  const ttlRef = useRef(ttl);
  ttlRef.current = ttl;

  const execute = useCallback(async (bustCache = false) => {
    if (!bustCache) {
      const cached = getCache<T>(cacheKeyRef.current);
      if (cached !== null) {
        setData(cached);
        setLoading(false);
        setError(null);
        return;
      }
    }

    setLoading(true);
    setError(null);
    try {
      const result = await fetcherRef.current();
      setCache(cacheKeyRef.current, result, ttlRef.current);
      setData(result);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    execute(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey, enabled]);

  const refetch = useCallback(() => execute(true), [execute]);

  return { data, loading, error, refetch };
}
