import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Gigs from './pages/Gigs';
import CreateGig from './pages/CreateGig';
import EditGig from './pages/EditGig';
import GigDetail from './pages/GigDetail';
import Profile from './pages/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReviewApplications from './pages/ReviewApplications';
import AdminUserManagement from './pages/AdminUserManagement';
import AccountDisabled from './pages/AccountDisabled';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>          
          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/gigs" element={
            <ProtectedRoute>
              <Gigs />
            </ProtectedRoute>
          } />

          <Route path="/create-gig" element={
            <ProtectedRoute>
              <CreateGig />
            </ProtectedRoute>
          } />

          <Route path="/edit-gig/:id" element={
            <ProtectedRoute>
              <EditGig />
            </ProtectedRoute>
          } />

          <Route path="/gigs/:id" element={
            <ProtectedRoute>
              <GigDetail />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          <Route path="/review-applications" element={
            <ProtectedRoute>
              <ReviewApplications />
            </ProtectedRoute>
          } />

          <Route path="/admin/users" element={<AdminUserManagement />} />
          <Route path="/account-disabled" element={<AccountDisabled />} />

          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
      {/*<ToastContainer />*/}
    </AuthProvider>
  );
}
