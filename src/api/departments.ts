const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

const parseError = async (response: Response) => {
  try {
    const data = await response.json();
    if (data.detail) return data.detail;
    return "An unexpected error occurred.";
  } catch (e) {
    return "Connection error.";
  }
};

export interface Department {
  id: string;
  name: string;
}

export const getDepartments = async () => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/departments/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
};
