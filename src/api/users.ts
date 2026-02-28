const API_URL = "http://localhost:8000/api/v1";

const parseError = async (response: Response) => {
  try {
    const data = await response.json();
    if (data.detail) return data.detail;
    return "An unexpected error occurred.";
  } catch (e) {
    return "Connection error.";
  }
};

export const getCurrentProfile = async () => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
};
