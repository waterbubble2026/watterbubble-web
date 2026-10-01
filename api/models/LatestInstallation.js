import mongoose from 'mongoose';

const latestInstallationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.LatestInstallation || mongoose.model('LatestInstallation', latestInstallationSchema);
