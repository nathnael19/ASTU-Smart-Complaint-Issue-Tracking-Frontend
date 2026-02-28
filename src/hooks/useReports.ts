import { useQuery, type UseQueryResult } from "./useQuery";
import { getDepartmentReports, type Report } from "../api/reports";

const TWO_MIN_MS = 2 * 60 * 1000;

export function useDepartmentReports(): UseQueryResult<Report[]> {
  return useQuery("reports:dept", getDepartmentReports, {
    ttl: TWO_MIN_MS,
  });
}
