import API from './index';

// Get another user's profile (by ID)
export const fetchUserById = (userId) => API.get(`/users/${userId}`);
