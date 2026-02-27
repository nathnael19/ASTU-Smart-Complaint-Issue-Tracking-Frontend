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

export const logoutUser = async () => {
  const token = localStorage.getItem("access_token");

  try {
    if (token) {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  } catch (err) {
    console.error("Backend logout failed:", err);
  } finally {
    // Always clear local storage regardless of backend success
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  }
};
export const requestPasswordReset = async (email: string) => {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to request password reset");
  }

  return data;
};

export const resetPassword = async (password: string) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to reset password");
  }

  return data;
};

export const verifyOTP = async (
  email: string,
  token: string,
  type: string = "recovery",
) => {
  const response = await fetch(`${API_URL}/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, token, type }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Verification failed");
  }

  return response.json();
};
