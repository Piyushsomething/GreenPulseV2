//for user registration approval
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const AdminComponent4 = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = Cookies.get('access_token_login');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_GREENPULSE}/signup/all`, {
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
      // alert('Your session expired.Plz logout and login again.');
    }
  };

  const handleVerification = async (userId, verificationStatus) => {
    const token = Cookies.get('access_token_login');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_GREENPULSE}/signup/${userId}`, {
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

  const actionBodyTemplate = (rowData) => {
    return (
      <div>
        <Button
          onClick={() => handleVerification(rowData.id, true)}
          disabled={rowData.verified_user}
          className="p-button p-button-sm p-button-primary mr-2"
        >
          Approve
        </Button>
        <Button
          onClick={() => handleVerification(rowData.id, false)}
          disabled={!rowData.verified_user}
          className="p-button p-button-sm p-button-danger"
        >
          Deny
        </Button>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <DataTable
        value={users}
        scrollable
        scrollHeight="400px"
        className="p-datatable-gridlines"
      >
        <Column field="username" header="Username" />
        <Column field="email" header="Email" />
        <Column field="full_name" header="Full Name" />
        <Column field="is_admin" header="Admin" body={(data) => (data.is_admin ? 'Yes' : 'No')} />
        <Column field="verified_user" header="Verified" body={(data) => (data.verified_user ? 'Yes' : 'No')} />
        <Column header="Actions" body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
};

export default AdminComponent4;