const mongoose = require('mongoose');

// A gig posted by a client
const gigSchema = new mongoose.Schema({
  title: { type: String, required: true },          
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
}, {
  timestamps: true
});

module.exports = mongoose.model('Gig', gigSchema);
