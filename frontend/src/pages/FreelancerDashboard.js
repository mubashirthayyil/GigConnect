import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/FreelancerDashboard.css';

export default function FreelancerDashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <div className="freelancer-dashboard">
      <h2 className="dashboard-title">Freelancer Dashboard</h2>

      <div className="dashboard-actions">
        <div className="action-card" onClick={() => navigate('/gigs')}>
          <h3>Browse Available Gigs</h3>
          <p>Find gigs that match your skills and interests.</p>
        </div>

        <div className="action-card" onClick={() => navigate('/my-applications')}>
          <h3>My Applications</h3>
          <p>View and manage all your submitted applications.</p>
        </div>

        <div className="action-card" onClick={() => navigate('/profile')}>
          <h3>Profile Settings</h3>
          <p>Update your profile, experience, and skill details.</p>
        </div>

        <div className="action-card logout-card" onClick={() => { logout(); navigate('/login'); }}>
          <h3>Logout</h3>
          <p>Securely sign out of your freelancer account.</p>
        </div>
      </div>
    </div>
  );
}
