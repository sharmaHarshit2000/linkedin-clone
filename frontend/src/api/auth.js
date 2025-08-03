import API from './index';

// Register
export const registerUser = (userData) => API.post('/auth/register', userData);

// Login
export const loginUser = (credentials) => API.post('/auth/login', credentials);

// Get current user profile
export const getMe = () => API.get('/auth/me');