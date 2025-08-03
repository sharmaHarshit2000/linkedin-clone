import API from './index';

// Get current user profile
export const fetchUserProfile = () => API.get('/users/me');

// Get another user's profile (by ID)
export const fetchUserById = (userId) => API.get(`/users/${userId}`);
