import { useQuery, type UseQueryResult } from "./useQuery";
import { getCurrentProfile, getUsers, getDepartmentUsers } from "../api/users";

const FIVE_MIN_MS = 5 * 60 * 1000;

export function useCurrentProfile(): UseQueryResult<any> {
  return useQuery("users:me", getCurrentProfile, {
    ttl: FIVE_MIN_MS,
  });
}

export function useUsers(params: any = {}): UseQueryResult<any> {
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((acc, key) => {
      acc[key] = params[key];
      return acc;
    }, {} as any);

  const cacheKey = `users:list:${JSON.stringify(sortedParams)}`;

  return useQuery(cacheKey, () => getUsers(params), {
    ttl: FIVE_MIN_MS,
  });
}

export function useDepartmentUsers(): UseQueryResult<any> {
  return useQuery("users:department", getDepartmentUsers, {
    ttl: FIVE_MIN_MS,
  });
}
