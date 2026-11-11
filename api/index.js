import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import Subcategory from './models/Subcategory.js';
import LatestInstallation from './models/LatestInstallation.js';

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
    const currentCount = sub.images.length;
    const availableSlots = 25 - currentCount;
    
    if (availableSlots <= 0) {
      return res.status(400).json({ error: 'Max limit of 25 images reached for this subcategory.' });
    }
    
    if (files.length > availableSlots) {
      return res.status(400).json({ 
        error: `Cannot upload ${files.length} images. Only ${availableSlots} slot(s) remaining for this subcategory (maximum 25).` 
      });
    }
    
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

export default app;
