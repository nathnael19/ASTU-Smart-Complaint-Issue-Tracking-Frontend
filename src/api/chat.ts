const API_URL = "http://localhost:8000/api/v1";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  reply: string;
  source: "openrouter" | "fallback";
}

const parseError = async (response: Response): Promise<string> => {
  try {
    const data = await response.json();
    if (data.detail) return Array.isArray(data.detail) ? data.detail.map((e: any) => e.msg).join(". ") : data.detail;
    return "Something went wrong.";
  } catch {
    return "Connection error.";
  }
};

export const sendChatMessage = async (
  message: string,
  history?: ChatMessage[]
): Promise<ChatResponse> => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message: message.trim(),
      history: history ?? [],
    }),
  });
  if (!response.ok) {
    throw new Error(await parseError(response));
  }
  return response.json();
};
