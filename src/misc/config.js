const API_BASE_URL = 'https://api.tvmaze.com';

export const getApi = async queryString => {
  const result = await fetch(`${API_BASE_URL}${queryString}`);
  return result.json();
};
