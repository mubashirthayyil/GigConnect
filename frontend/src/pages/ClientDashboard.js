import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/ClientDashboard.css';

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <div className="client-dashboard">
      <h2 className="dashboard-title">Client Dashboard</h2>

      <div className="dashboard-actions">
        <div className="action-card" onClick={() => navigate('/create-gig')}>
          <h3>Create New Gig</h3>
          <p>Post a new project and find talented freelancers.</p>
        </div>

        <div className="action-card" onClick={() => navigate('/gigs')}>
          <h3>View My Gigs</h3>
          <p>Manage and track all your ongoing and past gigs.</p>
        </div>

        <div className="action-card" onClick={() => navigate('/review-applications')}>
          <h3>Review Applications</h3>
          <p>Check and approve freelancer applications easily.</p>
        </div>

        <div className="action-card logout-card" onClick={() => { logout(); navigate('/login'); }}>
          <h3>Logout</h3>
          <p>Sign out from your account safely.</p>
        </div>
      </div>
    </div>
  );
}
