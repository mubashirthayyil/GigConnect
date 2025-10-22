import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/api';
import '../styles/Profile.css';
import { FaUserCircle, FaEnvelope, FaMapMarkerAlt, FaTools } from 'react-icons/fa';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then(res => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );

  if (!profile)
    return (
      <div className="profile-container">
        <div className="error">Failed to load profile 😔</div>
      </div>
    );

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <FaUserCircle className="profile-avatar" />
          <h2>{profile.name}</h2>
          <p className="role-badge">{profile.role}</p>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <FaEnvelope className="icon" />
            <span>{profile.email}</span>
          </div>

          {profile.location && (
            <div className="detail-item">
              <FaMapMarkerAlt className="icon" />
              <span>{profile.location}</span>
            </div>
          )}

          {profile.skills && profile.skills.length > 0 && (
            <div className="detail-item">
              <FaTools className="icon" />
              <span>{profile.skills.join(', ')}</span>
            </div>
          )}
        </div>

        <div className="profile-bio">
          <h3>About</h3>
          <p>{profile.bio || 'No bio provided yet.'}</p>
        </div>
      </div>
    </div>
  );
}


{/*import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/api';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then(res => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Failed to load profile</div>;

  return (
    <div style={{ margin: '20px' }}>
      <h2>My Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
    </div>
  );
}
*/}