require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

/*, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}*/

// Main route (test)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// User endpoints
app.use('/api/users', userRoutes);


const gigRoutes = require('./routes/gigRoutes');
app.use('/api/gigs', gigRoutes);

const applicationRoutes = require('./routes/applicationRoutes');
app.use('/api/applications', applicationRoutes);

const messageRoutes = require('./routes/messageRoutes');
app.use('/api/messages', messageRoutes);

const path = require('path');
app.use(express.static(path.join(__dirname, '../public')));
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});