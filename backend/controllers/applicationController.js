const Application = require('../models/Application');

// Apply to a gig
exports.applyToGig = async (req, res) => {
  const { gigId, coverLetter } = req.body;
  try {
    const existingApplication = await Application.findOne({ gig: gigId, applicant: req.user._id });
    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied to this gig' });
    }
    const application = await Application.create({
      gig: gigId,
      applicant: req.user._id,
      coverLetter
    });
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get applications for a gig (for clients)
exports.getApplications = async (req, res) => {
  const { gigId } = req.params;
  try {
    const applications = await Application.find({ gig: gigId }).populate('applicant', 'name email');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
