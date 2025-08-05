type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface WebRequestOptions {
  method?: RequestMethod;
  endpoint: string;
  token?: string;
  payload?: any;
}

export async function MakeWebRequest({
  method = "GET",
  endpoint,
  token,
  payload,
}: WebRequestOptions): Promise<any> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Connection: "keep-alive",
        Accept: "application/json",
        ...(token && { Authorization: token }),
      },
      ...(payload && method !== "GET" && { body: JSON.stringify(payload) }),
    };

    const response = await fetch(endpoint, options);

    const contentType = response.headers.get("Content-Type");
    const isJson = contentType?.includes("application/json");

    if (!response.ok) {
      const errorResponse = isJson
        ? await response.json()
        : await response.text();
      throw new Error(JSON.stringify(errorResponse));
    }

    return isJson ? await response.json() : await response.text();
  } catch (error) {
    console.error("Web request error:", error);
    throw error;
  }
}
