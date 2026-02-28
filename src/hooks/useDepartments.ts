import { useQuery, type UseQueryResult } from "./useQuery";
import { getDepartments, type Department } from "../api/departments";

const TEN_MIN_MS = 10 * 60 * 1000;

export function useDepartments(): UseQueryResult<Department[]> {
  return useQuery("departments:list", getDepartments, {
    ttl: TEN_MIN_MS,
  });
}
