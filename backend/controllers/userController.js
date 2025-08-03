import mongoose from 'mongoose';
import User from '../models/User.js';
import Post from '../models/Post.js';

export const getUserProfile = async (req, res) => {
  const userId = req.params.id;

  // Check for valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate('author', 'name email'); 

    res.status(200).json({
      message: 'User profile fetched successfully',
      user,
      posts,
    });
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
