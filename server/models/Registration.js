import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seminarId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seminar', required: true },
    status: { type: String, enum: ['registered', 'cancelled'], default: 'registered' }
  },
  { timestamps: true }
);

RegistrationSchema.index({ userId: 1, seminarId: 1 }, { unique: true });

export default mongoose.model('Registration', RegistrationSchema);


