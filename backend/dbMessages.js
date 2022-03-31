import mongoose from 'mongoose';

const whatsAppSchema = new mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
});

export const Message = mongoose.model('Message', whatsAppSchema);
