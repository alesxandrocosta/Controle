import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const pagamentosService = {
  getAll: () => api.get('/pagamentos'),
  
  getById: (id) => api.get(`/pagamentos/${id}`),
  
  create: (data) => api.post('/pagamentos', data),
  
  update: (id, data) => api.put(`/pagamentos/${id}`, data),
  
  delete: (id) => api.delete(`/pagamentos/${id}`),
  
  search: (filters) => api.get('/pagamentos/search/filter', { params: filters }),
  
  importSpreadsheet: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export default api;
