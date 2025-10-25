const Message = require('../models/Message');

// Send a new message for a gig
exports.sendMessage = async (req, res) => {
  try {
    const { receiver, content, gig } = req.body;
    if (!receiver || !content || !gig) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const message = await Message.create({
      sender: req.user._id,
      receiver,
      gig,
      content
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// Get all messages for a gig between current user and another user
exports.getMessagesForGig = async (req, res) => {
  try {
    const { gigId, userId } = req.params;
    const messages = await Message.find({
      gig: gigId,
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id }
      ]
    }).sort('createdAt');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};
