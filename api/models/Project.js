import mongoose from 'mongoose';

export const PROJECT_STATUSES = ['Ongoing', 'Completed'];

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 150 },
  location: { type: String, required: true, trim: true, maxlength: 150 },
  description: { type: String, required: true, trim: true, maxlength: 5000 },
  status: { type: String, required: true, enum: PROJECT_STATUSES, default: 'Ongoing' },
  imageUrl: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', projectSchema);
