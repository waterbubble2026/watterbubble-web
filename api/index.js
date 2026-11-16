import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import Subcategory from './models/Subcategory.js';
import LatestInstallation from './models/LatestInstallation.js';
import Project, { PROJECT_STATUSES } from './models/Project.js';

dotenv.config();

const app = express();
app.use(express.json());

// Robust Serverless MongoDB connection helper
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bubblewater', {
    serverSelectionTimeoutMS: 8000,
  });
};

// Ensure DB is connected before processing requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('MongoDB connection error:', err);
    res.status(500).json({ error: 'Database connection failed: ' + err.message });
  }
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Use memory storage for Vercel
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB per file
});

// Helper to upload buffer to Cloudinary using direct base64 upload (prevents stream hangs in serverless)
const uploadToCloudinary = (fileOrBuffer) => {
  return new Promise((resolve, reject) => {
    try {
      const buffer = Buffer.isBuffer(fileOrBuffer) ? fileOrBuffer : fileOrBuffer.buffer;
      const mime = fileOrBuffer.mimetype || 'image/jpeg';
      const base64Data = `data:${mime};base64,${buffer.toString('base64')}`;

      cloudinary.uploader.upload(
        base64Data,
        { 
          folder: 'bubblewater',
          timeout: 25000,
          transformation: [
            { width: 1200, crop: 'limit' },
            { quality: 'auto:good' },
            { fetch_format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

// Helper to delete from Cloudinary by URL
const deleteFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl.includes('cloudinary')) return;
    // Extract public_id from URL: https://res.cloudinary.com/.../upload/v1234/bubblewater/abcde.jpg
    const parts = imageUrl.split('/');
    const filename = parts[parts.length - 1];
    const publicId = `bubblewater/${filename.split('.')[0]}`;
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
  }
};


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@admin.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  if (email === adminEmail && password === adminPassword) {
    res.json({ success: true, token: 'admin-token-123' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Get subcategories
app.get('/api/subcategories', async (req, res) => {
  try {
    const subs = await Subcategory.find().sort({ order: 1, createdAt: -1 });
    res.json(subs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create subcategory (no image initially)
app.post('/api/subcategories', async (req, res) => {
  try {
    const { name, mainCategory, order } = req.body;
    const sub = new Subcategory({ name, mainCategory, order: order || 0, images: [] });
    await sub.save();
    res.status(201).json(sub);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit subcategory (name and order)
app.put('/api/subcategories/:id', async (req, res) => {
  try {
    const { name, order } = req.body;
    const sub = await Subcategory.findById(req.params.id);
    if (!sub) return res.status(404).json({ error: 'Not found' });
    
    if (name !== undefined) sub.name = name;
    if (order !== undefined) sub.order = order;
    
    await sub.save();
    res.json(sub);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add images to subcategory (supports multiple or single uploads)
app.post('/api/subcategories/:id/images', upload.any(), async (req, res) => {
  try {
    const files = req.files || (req.file ? [req.file] : []);
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No image(s) provided' });
    }
    
    const sub = await Subcategory.findById(req.params.id);
    if (!sub) return res.status(404).json({ error: 'Not found' });
    
    if (!sub.images) sub.images = [];
    // Upload all files in parallel to Cloudinary
    const uploadResults = await Promise.all(
      files.map(file => uploadToCloudinary(file.buffer))
    );
    
    const newImages = uploadResults.map(result => ({ url: result.secure_url }));
    sub.images.push(...newImages);
    await sub.save();
    
    res.status(201).json(sub);
  } catch (error) {
    console.error('Error uploading subcategory images:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete image from subcategory
app.delete('/api/subcategories/:id/images/:imageId', async (req, res) => {
  try {
    const sub = await Subcategory.findById(req.params.id);
    if (!sub) return res.status(404).json({ error: 'Not found' });
    
    const image = sub.images.id(req.params.imageId);
    if (!image) return res.status(404).json({ error: 'Image not found' });
    
    await deleteFromCloudinary(image.url);
    
    sub.images.pull(req.params.imageId);
    await sub.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete subcategory (and all images)
app.delete('/api/subcategories/:id', async (req, res) => {
  try {
    const sub = await Subcategory.findById(req.params.id);
    if (!sub) return res.status(404).json({ error: 'Not found' });
    
    for (let img of sub.images) {
      await deleteFromCloudinary(img.url);
    }
    
    await Subcategory.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Latest Installations API

app.get('/api/latest-installations', async (req, res) => {
  try {
    const items = await LatestInstallation.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/latest-installations', upload.single('image'), async (req, res) => {
  try {
    const count = await LatestInstallation.countDocuments();
    if (count >= 4) {
      return res.status(400).json({ error: 'Max limit reached. Delete one then add new.' });
    }

    if (!req.file) return res.status(400).json({ error: 'No image provided' });
    
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ error: 'Title and description required' });

    const uploadResult = await uploadToCloudinary(req.file.buffer);
    const imageUrl = uploadResult.secure_url;

    const item = new LatestInstallation({ title, description, imageUrl });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/latest-installations/:id', async (req, res) => {
  try {
    const item = await LatestInstallation.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    
    await deleteFromCloudinary(item.imageUrl);
    
    await LatestInstallation.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Projects API

const isImageFile = (file) => !!file && typeof file.mimetype === 'string' && file.mimetype.startsWith('image/');

// Turns Mongoose validation errors into a 400 with a readable message, everything else into a 500
const sendProjectError = (res, error) => {
  if (error?.name === 'ValidationError') {
    const message = Object.values(error.errors).map(e => e.message).join(', ');
    return res.status(400).json({ error: message });
  }
  console.error('Projects API error:', error);
  return res.status(500).json({ error: error.message });
};

app.get('/api/projects', async (req, res) => {
  try {
    const items = await Project.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    sendProjectError(res, error);
  }
});

app.post('/api/projects', upload.single('image'), async (req, res) => {
  try {
    const { title, location, description, status } = req.body;
    if (!title?.trim() || !location?.trim() || !description?.trim()) {
      return res.status(400).json({ error: 'Title, location and description are required' });
    }
    if (!PROJECT_STATUSES.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${PROJECT_STATUSES.join(', ')}` });
    }
    if (!req.file) return res.status(400).json({ error: 'No image provided' });
    if (!isImageFile(req.file)) return res.status(400).json({ error: 'Only image files are allowed' });

    const uploadResult = await uploadToCloudinary(req.file);

    const item = new Project({
      title,
      location,
      description,
      status,
      imageUrl: uploadResult.secure_url
    });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    sendProjectError(res, error);
  }
});

// Update a project. The image is optional: send a new one to replace the old one.
app.put('/api/projects/:id', upload.single('image'), async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ error: 'Not found' });
    const item = await Project.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });

    const { title, location, description, status } = req.body;
    if (title !== undefined) item.title = title;
    if (location !== undefined) item.location = location;
    if (description !== undefined) item.description = description;
    if (status !== undefined) {
      if (!PROJECT_STATUSES.includes(status)) {
        return res.status(400).json({ error: `Status must be one of: ${PROJECT_STATUSES.join(', ')}` });
      }
      item.status = status;
    }

    let oldImageUrl = null;
    if (req.file) {
      if (!isImageFile(req.file)) return res.status(400).json({ error: 'Only image files are allowed' });
      const uploadResult = await uploadToCloudinary(req.file);
      oldImageUrl = item.imageUrl;
      item.imageUrl = uploadResult.secure_url;
    }

    await item.save();
    // Only remove the old image once the new one is safely saved
    if (oldImageUrl) await deleteFromCloudinary(oldImageUrl);
    res.json(item);
  } catch (error) {
    sendProjectError(res, error);
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ error: 'Not found' });
    const item = await Project.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });

    await deleteFromCloudinary(item.imageUrl);
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    sendProjectError(res, error);
  }
});

export default app;
