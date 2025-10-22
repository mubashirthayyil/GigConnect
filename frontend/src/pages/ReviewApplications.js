import React, { useEffect, useState } from 'react';
import { fetchClientApplications, updateApplicationStatus } from '../services/api';

export default function ReviewApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClientApplications()
      .then(res => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDecision = (id, decision) => {
    updateApplicationStatus(id, decision)
      .then(() => {
        setApplications(apps =>
          apps.map(app => (app._id === id ? { ...app, status: decision } : app))
        );
      })
      .catch(() => alert('Failed to update the application status'));
  };

  if (loading) return <div>Loading applications...</div>;
  if (applications.length === 0) return <div>No applications found.</div>;

  return (
    <div>
      <h2>Review Applications</h2>
      <ul>
        {applications.map(app => (
          <li key={app._id}>
            <strong>Freelancer:</strong> {app.freelancerId.name} - Skills: {app.freelancerId.skills.join(', ')}<br/>
            <strong>Proposal:</strong> {app.proposal}<br/>
            <strong>Status:</strong> {app.status}<br/>
            {app.status === 'pending' && (
              <>
                <button onClick={() => handleDecision(app._id, 'approved')}>Approve</button>
                <button onClick={() => handleDecision(app._id, 'rejected')}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
