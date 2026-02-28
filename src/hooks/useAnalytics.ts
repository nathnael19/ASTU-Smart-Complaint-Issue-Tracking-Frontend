import { useQuery, type UseQueryResult } from "./useQuery";
import {
  getDashboardSummary,
  getCategoryStats,
  getTrendStats,
  getDepartmentSummary,
  getDepartmentTrends,
  getDepartmentCategoryDistribution,
  getDepartmentMonthlyTrends,
  type DashboardSummary,
  type CategoryStat,
  type TrendStat,
  type DepartmentSummary,
  type DepartmentTrendStat,
  type DepartmentMonthlyTrendStat,
} from "../api/analytics";

// TTL Constants
const TWO_MIN_MS = 2 * 60 * 1000;
const FIVE_MIN_MS = 5 * 60 * 1000;

export function useDashboardSummary(): UseQueryResult<DashboardSummary> {
  return useQuery("analytics:admin:summary", getDashboardSummary, {
    ttl: TWO_MIN_MS,
  });
}

export function useCategoryStats(): UseQueryResult<CategoryStat[]> {
  return useQuery("analytics:admin:categories", getCategoryStats, {
    ttl: FIVE_MIN_MS,
  });
}

export function useTrendStats(): UseQueryResult<TrendStat[]> {
  return useQuery("analytics:admin:trends", getTrendStats, {
    ttl: FIVE_MIN_MS,
  });
}

export function useDepartmentSummary(): UseQueryResult<DepartmentSummary> {
  return useQuery("analytics:dept:summary", getDepartmentSummary, {
    ttl: TWO_MIN_MS,
  });
}

export function useDepartmentTrends(): UseQueryResult<DepartmentTrendStat[]> {
  return useQuery("analytics:dept:trends", getDepartmentTrends, {
    ttl: FIVE_MIN_MS,
  });
}

export function useDepartmentCategoryDistribution(): UseQueryResult<
  CategoryStat[]
> {
  return useQuery(
    "analytics:dept:categories",
    getDepartmentCategoryDistribution,
    { ttl: FIVE_MIN_MS },
  );
}

export function useDepartmentMonthlyTrends(): UseQueryResult<
  DepartmentMonthlyTrendStat[]
> {
  return useQuery("analytics:dept:monthly_trends", getDepartmentMonthlyTrends, {
    ttl: FIVE_MIN_MS,
  });
}
