import mongoose from 'mongoose';

const SeminarSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    speaker: { type: String, required: true },
    venue: { type: String, required: true },
    capacity: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    type: { type: String, enum: ['seminar', 'workshop'], default: 'seminar' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', index: true }
  },
  { timestamps: true }
);

export default mongoose.model('Seminar', SeminarSchema);


