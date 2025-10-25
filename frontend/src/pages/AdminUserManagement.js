import React, { useEffect, useState } from 'react';
import {
  getAllUsers,
  updateUser,
  deleteUser
} from '../services/api';
import toast, { Toaster } from 'react-hot-toast';
//import '../styles/AdminUserManagement.css';

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers()
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to load users');
        setLoading(false);
      });
  }, []);

  const handleRoleChange = (id, role) => {
    updateUser(id, { role })
      .then(res => {
        setUsers(users.map(u => (u._id === id ? res.data : u)));
        toast.success('Role updated successfully');
      })
      .catch(() => toast.error('Failed to update role'));
  };

  const handleToggleActive = (id, currentStatus) => {
    updateUser(id, { isActive: !currentStatus })
      .then(res => {
        setUsers(users.map(u => (u._id === id ? res.data : u)));
        toast.success('User status updated');
      })
      .catch(() => toast.error('Failed to update status'));
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this user?')) {
      deleteUser(id)
        .then(() => {
          setUsers(users.filter(u => u._id !== id));
          toast.success('User deleted');
        })
        .catch(() => toast.error('Failed to delete user'));
    }
  };

  const matchingUsers = users
    .filter(u => u.role !== 'admin')
    .filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(u => (roleFilter === 'all' ? true : u.role === roleFilter));

    // Prioritising sort: exact match, startsWith, includes, etc.
    const prioritisedUsers = [...matchingUsers].sort((a, b) => {
        const term = searchTerm.toLowerCase();
        // Highest priority: exact match in name or email
        if (
            a.name.toLowerCase() === term || a.email.toLowerCase() === term
        ) return -1;
        if (
            b.name.toLowerCase() === term || b.email.toLowerCase() === term
        ) return 1;

        // Next: startsWith in name/email
        if (
            a.name.toLowerCase().startsWith(term) ||
            a.email.toLowerCase().startsWith(term)
        ) return -1;
        if (
            b.name.toLowerCase().startsWith(term) ||
            b.email.toLowerCase().startsWith(term)
        ) return 1;

        // Next: includes search term in name/email
        if (
            a.name.toLowerCase().includes(term) ||
            a.email.toLowerCase().includes(term)
        ) return -1;
        if (
            b.name.toLowerCase().includes(term) ||
            b.email.toLowerCase().includes(term)
        ) return 1;

    // Default: no preference
    return 0;
    });


  if (loading) return <p>Loading users...</p>;

  return (
    <div className="admin-users">
      <Toaster position="bottom-right" />
      <h2>User Management</h2>

      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="freelancer">Freelancer</option>
          <option value="client">Client</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {prioritisedUsers.map(u => (
                <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                    <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    >
                    <option value="freelancer">Freelancer</option>
                    <option value="client">Client</option>
                    </select>
                </td>
                <td>{u.isActive ? 'Active' : 'Disabled'}</td>
                <td>
                    <button onClick={() => handleToggleActive(u._id, u.isActive)}>
                    {u.isActive ? 'Disable' : 'Enable'}
                    </button>
                    <button onClick={() => handleDelete(u._id)}>Delete</button>
                </td>
                </tr>
            ))}
            </tbody>
      </table>

      {prioritisedUsers.length === 0 && (
        <p style={{ marginTop: '20px' }}>No users found.</p>
      )}
    </div>
  );
}
