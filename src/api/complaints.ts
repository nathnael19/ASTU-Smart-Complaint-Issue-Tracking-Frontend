const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

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
  satisfaction_rating?: number;
  satisfaction_message?: string;
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

export interface ComplaintFilters {
  status?: string;
  priority?: string;
  category?: string;
  search?: string;
  start_date?: string;
  end_date?: string;
  limit?: number;
  offset?: number;
  submitted_by?: string;
}

export const getMyComplaints = async (params: ComplaintFilters = {}) => {
  const token = localStorage.getItem("access_token");
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, value.toString());
    }
  });

  const queryString = queryParams.toString();
  const url = `${API_URL}/complaints/${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
};

// For admins, the backend automatically returns all complaints when hitting the base /complaints API.
export const getAllComplaints = getMyComplaints;

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

export const updateComplaint = async (
  id: string,
  data: Partial<ComplaintCreate> & { status?: string },
) => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/complaints/${id}`, {
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

export const deleteComplaint = async (id: string) => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/complaints/${id}`, {
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

// ── Complaint thread (remarks) ─────────────────────────────────────────────────

export interface ComplaintRemarkAuthor {
  full_name?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
}

export interface ComplaintRemark {
  id: string;
  complaint_id: string;
  author_id: string;
  content: string;
  created_at: string;
  users?: ComplaintRemarkAuthor;
}

export const getComplaintRemarks = async (
  complaintId: string,
): Promise<{ data: ComplaintRemark[] }> => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/complaints/${complaintId}/remarks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(await parseError(response));
  }
  return response.json();
};

export const postComplaintRemark = async (
  complaintId: string,
  content: string,
): Promise<ComplaintRemark> => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/complaints/${complaintId}/remarks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content: content.trim() }),
  });
  if (!response.ok) {
    throw new Error(await parseError(response));
  }
  return response.json();
};
