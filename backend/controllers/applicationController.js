const Application = require('../models/Application');
const Gig = require('../models/Gig');

exports.applyToGig = async (req, res) => {
  const gigId = req.params.gigId;
  const { coverLetter } = req.body;
  try {
    const existingApplication = await Application.findOne({
      gigId,
      freelancerId: req.user._id,
    });
    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied to this gig' });
    }
    const application = await Application.create({
      gigId,
      freelancerId: req.user._id,
      proposal: coverLetter,
    });
    await Gig.findByIdAndUpdate(
      gigId,
      { $addToSet: { applicants: req.user._id } }
    );
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getApplications = async (req, res) => {
  const { gigId } = req.params;
  try {
    // Query Applications collection with field gigId
    const applications = await Application.find({ gigId }).populate('freelancerId', 'name skills email');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
