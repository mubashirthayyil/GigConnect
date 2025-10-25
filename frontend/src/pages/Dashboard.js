 import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import ClientDashboard from './ClientDashboard';
import FreelancerDashboard from './FreelancerDashboard';


export default function Dashboard() {
  const { user } = useContext(AuthContext);

  if (!user) return <div>Please log in</div>;

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'client':
      return <ClientDashboard />;
    case 'freelancer':
      return <FreelancerDashboard />;
    default:
      return <div>Role not recognized</div>;
  }
}


{/*import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import { FaUser, FaSignOutAlt, FaBriefcase, FaPlusCircle, FaUserCircle } from 'react-icons/fa';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userName = user?.user?.name || user?.name || 'Guest';
  const userRole = user?.user?.role || user?.role || 'Freelancer';

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <FaUserCircle className="user-avatar" />
          <div>
            <h2>Welcome, {userName} 👋</h2>
            <p className="role-badge">{userRole}</p>
          </div>
        </div>

        <div className="dashboard-buttons">
          <button className="dash-btn" onClick={() => navigate('/profile')}>
            <FaUser /> Profile
          </button>
          <button className="dash-btn" onClick={() => navigate('/gigs')}>
            <FaBriefcase /> View Gigs
          </button>
          <button className="dash-btn" onClick={() => navigate('/create-gig')}>
            <FaPlusCircle /> Post New Gig
          </button>
        </div>

        <div className="logout-section">
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

-------------------------------------------------------------------
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const userName = user?.user?.name || user?.name;
  const userRole = user?.user?.role || user?.role;

  return (
    <div style={{ margin: '20px' }}>
      <h1>Welcome to GigConnect Dashboard</h1>
      {userName ? (
        <p>Hello, {userName}! Your role: {userRole}</p>
      ) : (
        <p>Welcome back!</p>
      )}
      <button onClick={() => navigate('/profile')}>Profile</button>
      <button onClick={() => navigate('/gigs')}>View Gigs</button>
      <button onClick={() => navigate('/create-gig')}>Post a New Gig</button>
      
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
*/}