import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (user) => API.post('/users/register', user);
export const loginUser = (credentials) => API.post('/users/login', credentials);

export const getGigById = (id) => API.get(`/gigs/${id}`);
export const getGigs = () => API.get('/gigs');
export const postGig = (data) => API.post('/gigs', data);
export const updateGig = (id, data) => API.put(`/gigs/${id}`, data);
export const deleteGig = (id) => API.delete(`/gigs/${id}`);

export const getProfile = () => API.get('/users/me');
export const applyToGig = (gigId, coverLetter) => 
  API.post(`/gigs/${gigId}/apply`, { gigId, coverLetter });
export const fetchClientApplications = () => API.get('/gigs/client/applications');
export const updateApplicationStatus = (id, status) => API.put(`/gigs/applications/${id}`, { status });

// Admin user management APIs
export const getAllUsers = () => API.get('/admin/users');
export const getUserById = (id) => API.get(`/admin/users/${id}`);
export const updateUser = (id, data) => API.put(`/admin/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);

export default API;
