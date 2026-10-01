import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Subcategory from './models/Subcategory.js';
import LatestInstallation from './models/LatestInstallation.js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bubblewater')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\\s+/g, '-'));
  }
});
const upload = multer({ storage });

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
    const imageUrl = `/uploads/${req.file.filename}`;
    
    const sub = await Subcategory.findById(req.params.id);
    if (!sub) return res.status(404).json({ error: 'Not found' });
    
    if (!sub.images) sub.images = [];
    sub.images.push({ url: imageUrl });
    await sub.save();
    res.status(201).json(sub);
  } catch (error) {
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
    
    const safeUrl = image.url.startsWith('/') ? image.url.slice(1) : image.url;
    const imgPath = path.join(__dirname, '..', 'public', safeUrl);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }
    
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
      const safeUrl = img.url.startsWith('/') ? img.url.slice(1) : img.url;
      const imgPath = path.join(__dirname, '..', 'public', safeUrl);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
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
    const imageUrl = `/uploads/${req.file.filename}`;
    
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ error: 'Title and description required' });

    const item = new LatestInstallation({ title, description, imageUrl });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/latest-installations/:id', async (req, res) => {
  try {
    const item = await LatestInstallation.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    
    const safeUrl = item.imageUrl.startsWith('/') ? item.imageUrl.slice(1) : item.imageUrl;
    const imgPath = path.join(__dirname, '..', 'public', safeUrl);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }
    
    await LatestInstallation.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default app;
