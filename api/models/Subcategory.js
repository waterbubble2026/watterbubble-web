import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  order: { type: Number, default: 0 },
  mainCategory: { type: String, required: true, enum: ['Water Walls', 'Bubble Walls', 'Bubble Tubes'] },
  images: [{ 
    url: String, 
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true } 
  }]
}, { timestamps: true });

export default mongoose.models.Subcategory || mongoose.model('Subcategory', subcategorySchema);
