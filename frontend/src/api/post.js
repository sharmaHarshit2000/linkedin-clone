import API from './index';

// Create a new post
export const createPost = (postData) => API.post('/posts', postData);

// Get all posts
export const fetchAllPosts = () => API.get('/posts');

// Get posts by a specific user
export const fetchPostsByUser = (userId) => API.get(`/posts/user/${userId}`);
