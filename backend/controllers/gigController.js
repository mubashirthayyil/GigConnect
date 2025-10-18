const Gig = require('../models/Gig');

exports.createGig = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    if (!title || !description || !price || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Attach currently logged in user as postedBy
    const gig = await Gig.create({
      title,
      description,
      price,
      category,
      postedBy: req.user._id,
    });
    
    res.status(201).json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGigs = async (req, res) => {
  try {
    const gigs = await Gig.find().populate('postedBy', 'name email');
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
