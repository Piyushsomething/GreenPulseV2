//for user registration approval
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button } from 'primereact/button';

const AdminComponent4 = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = Cookies.get('access_token_login');
    try {
      const response = await fetch('http://127.0.0.1:8000/signup/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (error) {
      alert('Your session expired.Plz logout and login again.');
    }
  };

  const handleVerification = async (userId, verificationStatus) => {
    const token = Cookies.get('access_token_login');
    try {
      const response = await fetch(`http://127.0.0.1:8000/signup/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({ verified_user: verificationStatus })
      });
      if (response.ok) {
        fetchUsers(); // Refresh the user list
        alert(`User verification status updated.`);
      } else {
        throw new Error('Failed to update user verification status');
      }
    } catch (error) {
      alert('Failed to update user verification status. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Admin</th>
              <th>Verified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.full_name}</td>
                <td>{user.is_admin ? 'Yes' : 'No'}</td>
                <td>{user.verified_user ? 'Yes' : 'No'}</td>
                <td>
                  <Button
                    onClick={() => handleVerification(user.id, true)}
                    disabled={user.verified_user}
                    className="btn btn-sm btn-primary mr-2"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleVerification(user.id, false)}
                    disabled={!user.verified_user}
                    className="btn btn-sm btn-error"
                  >
                    Deny
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminComponent4;