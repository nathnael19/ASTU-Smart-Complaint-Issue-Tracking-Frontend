const API_URL = "http://localhost:8000/api/v1";

const parseError = async (response: Response) => {
  try {
    const data = await response.json();
    return data.detail || "An unexpected error occurred.";
  } catch (e) {
    return "Connection error.";
  }
};

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  link?: string;
  is_read: boolean;
  created_at: string;
}

export const getNotifications = async (): Promise<Notification[]> => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/notifications/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
};

export const markAsRead = async (id: string): Promise<Notification> => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/notifications/${id}/read`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
};

export const markAllAsRead = async (): Promise<{ message: string }> => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/notifications/mark-all-read`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
};
