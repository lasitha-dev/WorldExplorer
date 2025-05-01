const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Log all requests
app.use((req, res, next) => {
  console.log('Request received:', {
    path: req.path,
    method: req.method,
    body: JSON.stringify(req.body),
    headers: req.headers
  });
  next();
});

// Middleware
app.use(cors());
app.use(express.json());

// Debug environment variables
console.log('Environment variables available:', Object.keys(process.env));
console.log('MONGO_URI defined:', !!process.env.MONGO_URI);
console.log('MONGO_URI value:', process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 20) + '...' : 'undefined');
console.log('JWT_SECRET defined:', !!process.env.JWT_SECRET);
console.log('JWT_EXPIRE defined:', !!process.env.JWT_EXPIRE);

// Connect to MongoDB
console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    // Log more detailed error
    console.error('MongoDB detailed error:', JSON.stringify(err));
  });

// Create User schema and model directly in the function
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

// Authentication middleware
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }
};

// API routes
// Note: The base path is /.netlify/functions/api, so we don't need to add /api here

// Register user
app.post('/users/register', async (req, res) => {
  console.log('Registration endpoint hit with data:', JSON.stringify(req.body));
  try {
    const { name, email, password } = req.body;
    console.log('Processing registration for:', email);
    
    // Check if user exists
    console.log('Checking if user exists...');
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    // Create user
    console.log('Creating new user...');
    const user = await User.create({
      name,
      email,
      password
    });
    
    // Create token
    console.log('User created, generating token');
    const token = user.getSignedJwtToken();
    
    console.log('Registration successful for:', email);
    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error('Registration error:', error.message);
    console.error('Full error:', JSON.stringify(error));
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login user
app.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check for email and password
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Create token
    const token = user.getSignedJwtToken();
    
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get current logged in user
app.get('/users/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error getting user data' });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', environment: process.env.NODE_ENV });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Export the serverless function
module.exports.handler = serverless(app); 