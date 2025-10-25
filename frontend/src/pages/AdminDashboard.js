import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      <div className="dashboard-actions">
        <div className="action-card" onClick={() => navigate('/admin/users')}>
          <h3>Manage Users</h3>
          <p>View, edit, or remove users from the platform.</p>
        </div>

        <div className="action-card" onClick={() => navigate('/gigs')}>
          <h3>View All Gigs</h3>
          <p>Monitor all gigs created by clients and freelancers.</p>
        </div>

        {/*<div className="action-card" onClick={() => navigate('/manage-reports')}>
          <h3>Manage Reports</h3>
          <p>Review and take action on reported activities.</p>
        </div>*/}

        <div className="action-card logout-card" onClick={() => { logout(); navigate('/login'); }}>
          <h3>Logout</h3>
          <p>Sign out securely from your admin account.</p>
        </div>
      </div>
    </div>
  );
}
