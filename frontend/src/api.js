import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: (username, email, password) =>
    api.post('/api/auth/register/', { username, email, password }),
  login: (username, password) => api.post('/api/auth/token/', { username, password }),
  getProfile: () => api.get('/api/auth/me/'),
};

// Workspace endpoints
export const workspaceAPI = {
  getBoards: () => api.get('/api/workspace/boards/'),
  createBoard: (name) => api.post('/api/workspace/boards/', { name }),
  getBoard: (id) => api.get(`/api/workspace/boards/${id}/`),
  updateBoard: (id, data) => api.put(`/api/workspace/boards/${id}/`, data),
  deleteBoard: (id) => api.delete(`/api/workspace/boards/${id}/`),

  getComponents: () => api.get('/api/workspace/components/'),
  createComponent: (boardId, data) =>
    api.post('/api/workspace/components/', { board: boardId, ...data }),
  updateComponent: (id, data) => api.put(`/api/workspace/components/${id}/`, data),
  deleteComponent: (id) => api.delete(`/api/workspace/components/${id}/`),
};
