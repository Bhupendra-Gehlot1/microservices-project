import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { publishEvent } from '../utils/redis.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    
    publishEvent('USER_REGISTERED', { userId: user._id, username, email });
    
    res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Login failed', error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Failed to get profile', error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { username, email, updatedAt: Date.now() },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    publishEvent('USER_PROFILE_UPDATED', { userId: user._id, username: user.username, email: user.email });
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update profile', error: error.message });
  }
};