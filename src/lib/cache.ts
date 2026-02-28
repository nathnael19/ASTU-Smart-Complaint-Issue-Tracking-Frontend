/**
 * cache.ts — In-memory TTL cache for frontend API responses.
 *
 * Usage:
 *   setCache("dept:summary", data, 2 * 60 * 1000); // 2 min TTL
 *   const cached = getCache<MyType>("dept:summary");
 *   invalidateCache("dept:summary", "complaints:list");
 *   clearCache(); // Call on logout
 */

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const store = new Map<string, CacheEntry<any>>();

/**
 * Retrieve a cached value. Returns null if the key is missing or expired.
 */
export function getCache<T>(key: string): T | null {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }
  return entry.data as T;
}

/**
 * Store a value in the cache with a TTL in milliseconds.
 */
export function setCache<T>(key: string, data: T, ttlMs: number): void {
  store.set(key, {
    data,
    expiresAt: Date.now() + ttlMs,
  });
}

/**
 * Invalidate one or more cache keys.
 * Supports prefix wildcards by ending the key with '*'.
 * Example: invalidateCache("complaints:*") removes all complaints keys.
 */
export function invalidateCache(...keys: string[]): void {
  for (const key of keys) {
    if (key.endsWith("*")) {
      const prefix = key.slice(0, -1);
      for (const k of store.keys()) {
        if (k.startsWith(prefix)) {
          store.delete(k);
        }
      }
    } else {
      store.delete(key);
    }
  }
}

/**
 * Purge the entire cache. Call this on user logout.
 */
export function clearCache(): void {
  store.clear();
}

/** Returns the count of currently live entries (for debugging). */
export function getCacheSize(): number {
  return store.size;
}
