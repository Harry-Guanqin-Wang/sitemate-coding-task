// Note: These data should be normally imported from .env
// this approach is not used for the purpose of the assignment
const API_BASE_URL = "https://newsapi.org/v2";
const API_KEY = "183daca270264bad86fc5b72972fb82a";

export const apiClient = async (
  endpoint,
  params = {},
  method = "GET",
  body = null
) => {
  // Add API Key to app request as it needed
  const queryParams = new URLSearchParams({
    ...params,
    apiKey: API_KEY,
  });

  // config part and headers of request
  const config = {
    method: method,
    body: JSON.stringify(body),
  };

  const baseUrl = endpoint ? `${API_BASE_URL}/${endpoint}` : `${API_BASE_URL}`;
  const url = `${baseUrl}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, body);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
