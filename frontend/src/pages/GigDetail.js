import React, { useEffect, useState, useContext } from 'react';
import { getGigById, applyToGig } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/GigDetail.css';
import { FaArrowLeft, FaMoneyBillWave, FaTags, FaClipboardList, FaUser, FaGamepad, FaArrowRight } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

export default function GigDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const [error, setError] = useState('');
  const [applyMsg, setApplyMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const handleApply = () => {
    const coverLetter = prompt('Cover Letter:');
    applyToGig(gig._id, coverLetter)
      .then(() => setApplyMsg('Application successful!'))
      .catch((err) =>
        setApplyMsg(err.response?.data?.message || 'Application failed')
      );
  };

  useEffect(() => {
    getGigById(id)
      .then((res) => {
        setGig(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Gig not found');
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="gigdetail-container">
        <div className="loading">Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="gigdetail-container">
        <div className="error">{error}</div>
      </div>
    );

  return (
    <div className="gigdetail-container">
      <div className="gigdetail-card">
        <div className="gigdetail-header">
          <h1>{gig.title}</h1>
          <p className="gig-category">
            <FaUser /> {gig.postedBy.name || 'Unknown Client'} &nbsp; | &nbsp;
            <FaTags /> {gig.category || 'General'} &nbsp; | &nbsp;
            <FaArrowRight/> {gig.status || 'Closed'}
          </p>
        </div>
        <div className="gigdetail-body">
          <p className="gig-description">
            <FaClipboardList className="icon" /> {gig.description || 'No description provided.'}
          </p>
          <p className="gig-price">
            <FaMoneyBillWave className="icon" /> <strong>{gig.price || gig.budget || 0} USD</strong>
          </p>
        </div>
        <div className="gigdetail-footer">
          {user?.role === 'freelancer' && (
            <div>
              <button className="apply-btn" onClick={handleApply}>
                Apply for Gig
              </button>
            </div>
          )}
          {applyMsg && <p className="apply-message">{applyMsg}</p>}
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>
        </div>
      </div>
    </div>
  );
}


{/*import React, { useEffect, useState } from 'react';
import { getGigById, applyToGig } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function GigDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const [error, setError] = useState('');
  const [applyMsg, setApplyMsg] = useState('');
  
  function handleApply() {
    applyToGig(id)
      .then(res => setApplyMsg(res.data.message))
      .catch(err => setApplyMsg(err.response?.data?.message || 'Error'));
  }

  useEffect(() => {
    getGigById(id)
      .then(res => setGig(res.data))
      .catch(() => setError('Gig not found'));
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!gig) return <div>Loading...</div>;

  return (
    <div style={{ margin: '20px' }}>
      <h2>{gig.title}</h2>
      <p><strong>Description:</strong> {gig.description}</p>
      <p><strong>Price:</strong> {gig.price} USD</p>
      <p><strong>Category:</strong> {gig.category}</p>
      <button onClick={handleApply}>Apply for Gig</button>
        {applyMsg && <p>{applyMsg}</p>}
      <button onClick={() => navigate(-1)}>Back</button>
      {/*{gig.status === 'open' && gig.postedBy !== user._id && (
        <button onClick={handleApply}>Apply for Gig</button>
      )}/}
    </div>
  );
}
*/}