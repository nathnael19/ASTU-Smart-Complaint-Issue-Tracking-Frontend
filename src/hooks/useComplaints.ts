import { useQuery, type UseQueryResult } from "./useQuery";
import {
  getMyComplaints,
  getComplaintDetails,
  type ComplaintFilters,
} from "../api/complaints";

const SIXTY_SEC_MS = 60 * 1000;

export function useComplaints(
  filters: ComplaintFilters = {},
): UseQueryResult<any> {
  // Create a unique cache key based on the serialized filters
  // We sort keys to ensure { status: "OPEN", limit: 5 } produces the same key as { limit: 5, status: "OPEN" }
  const sortedFilters = Object.keys(filters)
    .sort()
    .reduce((acc, key) => {
      // @ts-ignore
      acc[key] = filters[key];
      return acc;
    }, {} as any);

  const cacheKey = `complaints:list:${JSON.stringify(sortedFilters)}`;

  return useQuery(cacheKey, () => getMyComplaints(filters), {
    ttl: SIXTY_SEC_MS,
  });
}

export function useComplaintDetail(
  id: string | undefined,
): UseQueryResult<any> {
  return useQuery(
    `complaints:detail:${id}`,
    () => (id ? getComplaintDetails(id) : Promise.reject("No ID provided")),
    {
      ttl: SIXTY_SEC_MS,
      enabled: !!id, // Only run the query if we have an ID
    },
  );
}
