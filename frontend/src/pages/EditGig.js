import React, { useEffect, useState } from 'react';
import { updateGig, getGigs } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/EditGig.css';
import { FaArrowLeft, FaClipboardList, FaDollarSign, FaTag, FaHeading } from 'react-icons/fa';

export default function EditGig() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', price: '', category: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    getGigs()
      .then((res) => {
        const gig = res.data.find((g) => g._id === id);
        if (gig) setForm(gig);
        else setError('Gig not found');
      })
      .catch(() => setError('Failed to fetch gig'));
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateGig(id, form)
      .then(() => navigate('/gigs'))
      .catch(() => setError('Update failed'));
  }

  return (
    <div className="editgig-container">
      <div className="editgig-card">
        <h2 className="editgig-title">Edit Gig Details</h2>
        <p className="editgig-subtitle">Make changes and save your gig 🎨</p>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit} className="editgig-form">
          <div className="form-group">
            <label><FaHeading /> Title</label>
            <input
              name="title"
              placeholder="Gig title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label><FaClipboardList /> Description</label>
            <textarea
              name="description"
              placeholder="Describe your gig..."
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label><FaDollarSign /> Price (USD)</label>
            <input
              name="price"
              type="number"
              placeholder="Enter price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label><FaTag /> Category</label>
            <input
              name="category"
              placeholder="e.g., Web Development"
              value={form.category}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="update-btn">Update Gig</button>
        </form>

        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
      </div>
    </div>
  );
}


{/*import React, { useEffect, useState } from 'react';
import { updateGig, getGigs } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditGig() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', price: '', category: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    // Optionally fetch the gig details if not available
    getGigs()
      .then(res => {
        const gig = res.data.find(g => g._id === id);
        if (gig) setForm(gig);
      })
      .catch(() => setError('Not found'));
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateGig(id, form)
      .then(() => navigate('/gigs'))
      .catch(err => setError('Update failed'));
  }

  return (
    <div>
      <h2>Edit Gig</h2>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} required />
        <textarea name="description" value={form.description} onChange={handleChange} required />
        <input name="price" value={form.price} onChange={handleChange} type="number" required />
        <input name="category" value={form.category} onChange={handleChange} required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
*/}