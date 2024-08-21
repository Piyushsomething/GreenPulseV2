"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const AdminComponent3 = () => {
  const router = useRouter();
  const [userRequests, setUserRequests] = useState([]);

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const token = Cookies.get("access_token_login");
        if (token) {
          const isAdmin = Cookies.get("IsAdmin");
          if (isAdmin === "false") {
            router.push("/Dashboard");
            return;
          }

          const response = await fetch("http://127.0.0.1:8000/tickets/all", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setUserRequests(data);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching user requests:", error.message);
      }
    };

    fetchUserRequests();
  }, []);

  const handleUserRequest = async (id, adminApproval) => {
    try {
      const token = Cookies.get("access_token_login");
      const response = await fetch(`http://127.0.0.1:8000/tickets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          admin_approval: adminApproval,
          payment_status: "true",
        }),
      });

      if (response.ok) {
        setUserRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === id ? { ...request, admin_approval: adminApproval } : request
          )
        );
      } else {
        console.error("Error updating user request:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user request:", error.message);
    }
  };

  return (
    <div className="p-4 h-full overflow-auto">
      <h2 className="text-2xl font-semibold mb-4">ADMIN PANEL</h2>
      <hr/>
      <h2 className="text-2xl font-semibold mb-4">User Preferences</h2>
      <table className="table w-full mb-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Area</th>
            <th>Plant</th>
            <th>Number of Plants</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userRequests.map((request) => (
            <tr
              key={request.id}
              className={request.admin_approval === false ? "bg-red-100" : ""}
            >
              <td>{request.id}</td>
              <td>{request.user.username}</td>
              <td>{request.area.area}</td>
              <td>{request.plant.plant_name}</td>
              <td>{request.no_of_plants}</td>
              <td>
                {request.admin_approval === true ? "Approved" : request.admin_approval === false ? "Denied" : "Pending"}
              </td>
              <td>
                {request.admin_approval !== false && (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none mr-2"
                    onClick={() => handleUserRequest(request.id, false)}
                  >
                    Deny
                  </button>
                )}
                {request.admin_approval !== true && (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
                    onClick={() => handleUserRequest(request.id, true)}
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminComponent3;