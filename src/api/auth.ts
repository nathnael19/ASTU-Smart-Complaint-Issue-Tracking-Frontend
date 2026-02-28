const API_URL = "http://localhost:8000/api/v1";

const parseError = async (response: Response) => {
  try {
    const data = await response.json();
    if (data.detail) {
      if (Array.isArray(data.detail)) {
        // Flatten FastAPI validation errors: [{loc: [], msg: "", type: ""}]
        return data.detail.map((err: any) => err.msg).join(". ");
      }

      // Handle specific Supabase/Auth errors
      if (data.detail.toLowerCase().includes("rate limit exceeded")) {
        return "You've made too many attempts. Please wait a while (usually up to an hour) before trying again.";
      }

      return data.detail;
    }
    return "An unexpected error occurred.";
  } catch (e) {
    return "Connection error. Please check your network.";
  }
};

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

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
};

export const fetchDepartments = async () => {
  const response = await fetch(`${API_URL}/departments/`);
  if (!response.ok) {
    throw new Error(await parseError(response));
  }
  return response.json();
};

export const loginUser = async (credentials: any) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
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

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
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

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
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
    throw new Error(await parseError(response));
  }

  return response.json();
};
