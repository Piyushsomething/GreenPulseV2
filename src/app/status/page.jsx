"use client"
// pages/status.js
import React, { useEffect, useCallback } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Timeline } from "primereact/timeline";
import { Chart } from "primereact/chart";
import usePlantSelectionStore from "@/store/PlantSelection";
import Component2 from "@/components/DashboardComponents/Component2";
import Cookies from "js-cookie";
import { Cartesian3 } from "cesium";

const StatusPage = () => {
  const {
    userRequests,
    setUserRequests,
    selectedCoordinates,
    setSelectedCoordinates,
  } = usePlantSelectionStore();

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const token = Cookies.get("access_token_login");
        if (!token) {
          // Handle no token scenario (e.g., redirect to login)
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_GREENPULSE}/tickets/`, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user requests");
        }

        const data = await response.json();
        setUserRequests(data);
      } catch (error) {
        console.error("Error fetching user requests:", error);
      }
    };

    fetchUserRequests();
  }, [setUserRequests]);

  const areCoordinatesEqual = useCallback((coord1, coord2) => {
    return coord1.every((c1, index) => 
      c1.x === coord2[index].x && c1.y === coord2[index].y && c1.z === coord2[index].z
    );
  }, []);

  const handleRowClick = useCallback((rowData) => {
    const coordinates = rowData.area.lat[0].split(" ").map((lat, index) => {
      const lon = rowData.area.lon[0].split(" ")[index];
      const parsedLat = parseFloat(lat);
      const parsedLon = parseFloat(lon);
      return Cartesian3.fromDegrees(parsedLon, parsedLat);
    });

    if (!selectedCoordinates || !areCoordinatesEqual(coordinates, selectedCoordinates)) {
      setSelectedCoordinates(coordinates);
    }
  }, [selectedCoordinates, setSelectedCoordinates, areCoordinatesEqual]);

  const paymentStatusTemplate = (rowData) => (
    <span
      className={`rounded-lg px-2 py-1 text-white ${
        rowData.payment_status ? "bg-green-500" : "bg-yellow-500"
      }`}
    >
      {rowData.payment_status ? "Done" : "Pending"}
    </span>
  );

  const timelineEvents = [
    { status: "Ordered", date: "15/10/2020 10:30", icon: "pi pi-shopping-cart", color: "#9C27B0" },
    { status: "Plant Sown", date: "15/10/2020 14:00", icon: "pi pi-cog", color: "#673AB7" },
    { status: "Irrigation Done", date: "15/10/2020 16:15", icon: "pi pi-shopping-cart", color: "#FF9800" },
    { status: "Pesticide Done", date: "16/10/2020 10:00", icon: "pi pi-check", color: "#607D8B" }
  ];

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Plant Health",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "#4bc0c0"
      }
    ]
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 min-h-screen">
      {/* Component 1: User Requests Table */}
      <div className="lg:col-span-1 md:col-span-2 col-span-1 lg:row-span-1 overflow-auto">
        <h2 className="text-xl font-bold mb-2">User Requests</h2>
        <DataTable value={userRequests} onRowClick={(e) => handleRowClick(e.data)} scrollable scrollHeight="300px" className="max-h-80 lg:max-h-full">
          <Column field="area.area" header="Area" />
          <Column field="plant.plant_name" header="Plant" />
          <Column field="no_of_plants" header="Number of Plants" />
          <Column field="payment_status" header="Payment Status" body={paymentStatusTemplate} />
        </DataTable>
      </div>

      {/* Component 2: User Info */}
      <div className="lg:col-span-1 md:col-span-2 col-span-1 lg:row-span-1 overflow-auto">
        <h2 className="text-xl font-bold mb-2">User Info</h2>
        {userRequests.length > 0 && (
          <Card>
            <div className="flex items-center mb-4">
              <img src={userRequests[0].user.photo} alt={userRequests[0].user.username} className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h3 className="text-lg font-semibold">{userRequests[0].user.full_name}</h3>
                <p>{userRequests[0].user.email}</p>
              </div>
            </div>
            <div>
              <p><strong>Username:</strong> {userRequests[0].user.username}</p>
              <p><strong>Admin:</strong> {userRequests[0].user.is_admin ? "Yes" : "No"}</p>
              <p><strong>Verified:</strong> {userRequests[0].user.verified_user ? "Yes" : "No"}</p>
              <p><strong>Adhaar Number:</strong> {userRequests[0].user.adhaar_no}</p>
            </div>
          </Card>
        )}
      </div>

      {/* Component 3: Cesium Map */}
      <div className="lg:col-span-2 md:col-span-2 col-span-1 lg:row-span-2 h-96 lg:h-auto">
        <Component2 />
      </div>

      {/* Component 4: Timeline */}
      <div className="lg:col-span-1 md:col-span-1 col-span-1 lg:row-span-1 overflow-auto">
        <h2 className="text-xl font-bold mb-2">Timeline</h2>
        <Timeline value={timelineEvents} content={(item) => item.status} />
      </div>

      {/* Component 5: Plant Health Chart */}
      <div className="lg:col-span-1 md:col-span-1 col-span-1 lg:row-span-1">
        <h2 className="text-xl font-bold mb-2">Plant Health</h2>
        <Chart type="line" data={chartData} />
      </div>
    </div>
  );
};

export default StatusPage;