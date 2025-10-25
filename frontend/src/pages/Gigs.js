import React, { useEffect, useState } from 'react';
import { getGigs, deleteGig } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Gigs.css';
import { FaEdit, FaTrash, FaArrowLeft, FaBriefcase } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  /*const fetchGigs = () => {
    getGigs()
      .then((res) => setGigs(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || 'Failed to load gigs')
      );
  };*/
  const fetchGigs = () => {
    getGigs()
      .then((res) => {
        let gigsData;

        if (user.role === 'client') {
          // Clients see only their own gigs
          gigsData = res.data.filter((gig) => gig.postedBy._id === user._id);
        } else {
          // Other roles see all gigs
          gigsData = res.data;
        }

        setGigs(gigsData);
      })
      .catch((err) =>
        setError(err.response?.data?.message || 'Failed to load gigs')
      );
  };


  useEffect(() => {
    fetchGigs();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this gig?')) {
      deleteGig(id)
        .then(() => fetchGigs())
        .catch(() => alert('Delete failed'));
    }
  };

  return (
    <div className="gigs-container">
      <div className="gigs-header">
        <h1>
          <FaBriefcase /> Available Gigs
        </h1>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
      </div>

      {error && <div className="error-box">{error}</div>}

      <div className="gig-list">
        {gigs.length > 0 ? (
          gigs.map((gig) => (
            <div key={gig._id} className="gig-card">
              <div onClick={() => navigate(`/gigs/${gig._id}`)}>
              <h3 className="gig-title">
                {gig.title}
              </h3>
              <p className="gig-desc">
                {gig.description
                  ? gig.description.substring(0, 100) + '...'
                  : 'No description provided.'}
              </p>
              <p className="gig-price">
                💰 {gig.price || gig.budget || 0} USD
              </p>
              </div>
              {(gig.postedBy._id === user._id || user.role === 'admin') && (
              <div className="gig-actions">
                
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/edit-gig/${gig._id}`)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(gig._id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
              )}
            </div>
            
          ))
        ) : (
          <p className="no-gigs">No gigs available yet.</p>
        )}
      </div>
    </div>
  );
}

{/*import React, { useEffect, useState } from 'react';
import { getGigs } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { deleteGig } from '../services/api';

function handleDelete(id) {
  if (window.confirm('Are you sure you want to delete this gig?')) {
    deleteGig(id)
      .then(() => window.location.reload()) // Or: re-fetch gigs to update the list
      .catch(err => alert('Delete failed'));
  }
}

export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getGigs()
      .then(res => setGigs(res.data))
      .catch(err => setError(err.response?.data?.message || 'Failed to load gigs'));
  }, []);
  const navigate = useNavigate();

  return (
    <div style={{ margin: '20px' }}>
      <h1>Available Gigs</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {gigs.length > 0 ? (
          gigs.map(gig => (
            <li key={gig._id}>
              <strong style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate(`/gigs/${gig._id}`)}>
                {gig.title}
              </strong> – {gig.price} USD
              <button onClick={() => navigate(`/edit-gig/${gig._id}`)}>Edit</button>
              <button style={{ marginLeft: '10px', color: 'red' }} onClick={() => handleDelete(gig._id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No gigs available yet.</p>
        )}
      </ul>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
*/}