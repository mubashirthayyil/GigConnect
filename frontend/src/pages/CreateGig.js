import React, { useState } from 'react';
import { postGig } from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Alert,
  Box,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../styles/CreateGig.css';

export default function CreateGig() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await postGig(form);
      setSuccess('Gig posted successfully!');
      setError('');
      setForm({ title: '', description: '', price: '', category: '' });
      setTimeout(() => navigate('/gigs'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Posting failed');
      setSuccess('');
    }
  }

  return (
    <div className="creategig-container">
      <Container maxWidth="sm">
        <Paper className="creategig-card" elevation={6}>
          <Typography variant="h4" className="creategig-title">
            <AddCircleOutlineIcon className="creategig-icon" />
            Post a New Gig
          </Typography>
          <Typography variant="body2" className="creategig-subtitle">
            Share your opportunity with freelancers on GigConnect 🌟
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <Box component="form" onSubmit={handleSubmit} className="creategig-form">
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              required
            />
            <TextField
              fullWidth
              label="Price (USD)"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              margin="normal"
              required
            />

            <Button type="submit" variant="contained" color="primary" fullWidth className="creategig-btn">
              Post Gig
            </Button>
          </Box>

          <Button
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            color="primary"
            fullWidth
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Paper>
      </Container>
    </div>
  );
}

{/*import React, { useState } from 'react';
import { postGig } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Box } from '@mui/material';

export default function CreateGig() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    postGig(form)
      .then(() => {
        alert('Gig posted successfully!');
        navigate('/create-gig');
      })
      .catch(err => setError(err.response?.data?.message || 'Posting failed'));
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Post a New Gig
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            margin="normal"
            multiline
            required
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            value={form.price}
            onChange={handleChange}
            margin="normal"
            type="number"
            required
          />
          <TextField
            fullWidth
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Post Gig
          </Button>
        </form>
      </Box>
      <button onClick={() => navigate(-1)}>Back</button>
    </Container>
    /*<div style={{ margin: '20px' }}>
      <h1>Post a New Gig</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Gig Title" value={form.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Gig Description" value={form.description} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <button type="submit">Post Gig</button>
      </form>
    </div>/}
  );
}
*/}