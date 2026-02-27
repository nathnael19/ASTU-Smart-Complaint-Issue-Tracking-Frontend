const API_URL = "http://localhost:8000/api/v1";

export const registerUser = async (userData: any) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
      full_name: userData.fullName,
      role: userData.role.toUpperCase(),
      department_name: userData.department,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Registration failed");
  }

  return data;
};

export const fetchDepartments = async () => {
  const response = await fetch(`${API_URL}/departments/`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch departments");
  }

  return data;
};
export const loginUser = async (credentials: any) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Login failed");
  }

  return data;
};
