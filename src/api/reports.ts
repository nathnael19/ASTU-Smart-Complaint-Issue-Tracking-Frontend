const API_URL = "http://localhost:8000/api/v1";

const parseError = async (response: Response) => {
  try {
    const data = await response.json();
    return data.detail || "An unexpected error occurred.";
  } catch (e) {
    return "Connection error.";
  }
};

export interface Report {
  id: string;
  name: string;
  file_type: "PDF" | "CSV" | "EXCEL";
  category: string;
  status: "GENERATING" | "READY" | "FAILED";
  created_at: string;
  storage_path?: string;
  department_id?: string;
}

export const getDepartmentReports = async (): Promise<Report[]> => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/reports/department`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
};
