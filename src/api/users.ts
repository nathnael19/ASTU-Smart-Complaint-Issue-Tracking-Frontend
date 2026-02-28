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
export const updateUserProfile = async (userId: string, data: any) => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
};
export const getUsers = async (
  params: {
    role?: string;
    status?: string;
    limit?: number;
    offset?: number;
    search?: string;
  } = {},
) => {
  const token = localStorage.getItem("access_token");
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) queryParams.append(key, value.toString());
  });

  const response = await fetch(`${API_URL}/users/?${queryParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
};

export const updateUserStatus = async (
  userId: string,
  status: "Active" | "Inactive",
) => {
  return updateUserProfile(userId, { status });
};

export const adminCreateUser = async (data: {
  email: string;
  full_name: string;
  role: "STUDENT" | "STAFF" | "ADMIN";
  department_id?: string;
  student_id_number?: string;
  program?: string;
  phone?: string;
  professional_title?: string;
  office_location?: string;
}) => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/users/admin-create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
};

export const deleteUser = async (userId: string) => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
};
