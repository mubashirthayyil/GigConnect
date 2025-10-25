const Gig = require('../models/Gig');
const Application = require('../models/Application');

exports.createGig = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    if (!title || !description || !price || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
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

exports.updateGig = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const gig = await Gig.findByIdAndUpdate(id, updates, { new: true });
  res.json(gig);
};

exports.deleteGig = async (req, res) => {
  try {
    await Gig.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gig deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
};

exports.getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: 'Gig not found' });
    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.applyToGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: 'Not found' });

    if (gig.applicants.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already applied' });
    }
    gig.applicants.push(req.user._id);
    await gig.save();
    res.json({ message: 'Applied successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Application failed' });
  }
};

exports.getApplicationsForClient = async (req, res) => {
  try {
    const clientId = req.user._id;
    const gigs = await Gig.find({ postedBy: clientId }).select('_id');

    const applications = await Application.find({ gigId: { $in: gigs.map(g => g._id) } })
      .populate('freelancerId', 'name skills email');

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await Application.findById(id);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    application.status = status;
    await application.save();

    res.json({ message: 'Application updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating application' });
  }
};
