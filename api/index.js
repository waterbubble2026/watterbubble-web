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

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bubblewater')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Use memory storage for Vercel
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper to upload buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { 
        folder: 'bubblewater',
        transformation: [
          { width: 1200, crop: 'limit' },
          { quality: 'auto:good' },
          { fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    uploadStream.end(buffer);
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

// Add image to subcategory
app.post('/api/subcategories/:id/images', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image provided' });
    
    const sub = await Subcategory.findById(req.params.id);
    if (!sub) return res.status(404).json({ error: 'Not found' });
    
    if (sub.images && sub.images.length >= 25) {
      return res.status(400).json({ error: 'Max limit of 25 images reached for this subcategory.' });
    }
    
    const uploadResult = await uploadToCloudinary(req.file.buffer);
    const imageUrl = uploadResult.secure_url;
    
    if (!sub.images) sub.images = [];
    sub.images.push({ url: imageUrl });
    await sub.save();
    res.status(201).json(sub);
  } catch (error) {
    console.error(error);
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
