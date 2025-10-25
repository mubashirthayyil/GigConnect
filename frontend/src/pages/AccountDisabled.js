import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AccountDisabled() {
  const location = useLocation();
  const navigate = useNavigate();
  // Pick a support email as fallback
  const supportEmail = (location.state && location.state.contact) || 'support@gigconnect.com';

  return (
    <div className="login-container">
      <div className="login-card" style={{textAlign: 'center'}}>
        <h2 className="login-title" style={{ color: "#dc2626" }}>Account Disabled</h2>
        <p className="login-subtitle">Your account has been temporarily disabled by admin.</p>
        <p>
          Please contact our customer care for further details about your account status and reactivation procedure.
        </p>
        <p>
          <strong>Contact Support:</strong> <br />
          <a href={`mailto:${supportEmail}`} style={{ color: "#2563eb" }}>
            {supportEmail}
          </a>
        </p>
        <button style={{ marginTop: 20 }} className="login-btn" onClick={() => navigate('/login')}>
          Back to Login
        </button>
      </div>
    </div>
  );
}
