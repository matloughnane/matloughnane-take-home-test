export const API_URL = "https://gongfetest.firebaseio.com/";

/**
 * Get the API Endpoint (Note, I wouldn't normally do this, but it seemed simpler to create this than append .json each time)
 * @param endpoint - The 'endpoint' for collecting the JSON
 */
export const constructAPIEndpoint = (endpoint: string): string => {
  return `${API_URL}/${endpoint}.json`;
};
