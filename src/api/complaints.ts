const API_URL = "http://localhost:8000/api/v1";

const parseError = async (response: Response) => {
  try {
    const data = await response.json();
    if (data.detail) {
      if (Array.isArray(data.detail)) {
        return data.detail.map((err: any) => err.msg).join(". ");
      }
      return data.detail;
    }
    return "An unexpected error occurred.";
  } catch (e) {
    return "Connection error. Please check your network.";
  }
};

export interface ComplaintCreate {
  title: string;
  description: string;
  category: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  department_id?: string;
  is_draft?: boolean;
  attachment_url?: string;
}

export interface AttachmentCreate {
  file_name: string;
  file_size_bytes: number;
  mime_type: string;
  storage_path: string;
}

export const createComplaint = async (data: ComplaintCreate) => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/complaints/`, {
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

export const addAttachmentMetadata = async (
  complaintId: string,
  data: AttachmentCreate,
) => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(
    `${API_URL}/complaints/${complaintId}/attachments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
};

export const getMyComplaints = async () => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/complaints/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
};

export const getComplaintDetails = async (id: string) => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/complaints/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
};
