const API_URL = "http://localhost:8000/api/v1";

const parseError = async (response: Response) => {
  try {
    const data = await response.json();
    return data.detail || "An unexpected error occurred.";
  } catch (e) {
    return "Connection error.";
  }
};

export interface DashboardSummary {
  total_complaints: number;
  resolution_rate: string;
  avg_resolution_time: string;
  active_users: number;
}

export interface CategoryStat {
  category: string;
  count: number;
}

export interface TrendStat {
  month: string;
  count: number;
}

export interface DepartmentSummary {
  assigned_tickets: number;
  pending_dept_tasks: number;
  avg_response_time: string;
  resolved_this_week: number;
  avg_satisfaction_rating: number;
}

export interface DepartmentTrendStat {
  day: string;
  value: number;
}

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/analytics/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
};

export const getCategoryStats = async (): Promise<CategoryStat[]> => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/analytics/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
};

export const getTrendStats = async (): Promise<TrendStat[]> => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/analytics/trends`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
};

export const getDepartmentSummary = async (): Promise<DepartmentSummary> => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/analytics/department/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
};

export const getDepartmentTrends = async (): Promise<DepartmentTrendStat[]> => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/analytics/department/trends`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
};
