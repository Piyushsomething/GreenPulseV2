// Component3.js
"use client";
import React, { useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import usePlantSelectionStore from "@/store/PlantSelection";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Cartesian3 } from "cesium";

const Component3 = () => {
  const router = useRouter();
  const {
    userRequests,
    setUserRequests,
    setSelectedCoordinates,
    areasData,
    selectedCoordinates,
  } = usePlantSelectionStore();

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const token = Cookies.get("access_token_login");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch(`http://127.0.0.1:8000/tickets/`, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error fetching user requests:", errorData);
          throw new Error(errorData.detail || "Unknown error");
        }

        const data = await response.json();
        setUserRequests(data);
      } catch (error) {
        console.error("Error fetching user requests:", error.message);
      }
    };

    fetchUserRequests();
  }, [router, setUserRequests]);

  const areCoordinatesEqual = (coord1, coord2) => {
    return (
      coord1.x === coord2.x && coord1.y === coord2.y && coord1.z === coord2.z
    );
  };

  const handleRowClick = (rowData) => {
    const area = areasData.find((area) => area.id === rowData.selected_area);

    if (area) {
      const coordinates = area.lat[0].split(" ").map((lat, index) => {
        const lon = area.lon[0].split(" ")[index];
        const parsedLat = parseFloat(lat);
        const parsedLon = parseFloat(lon);
        return Cartesian3.fromDegrees(parsedLon, parsedLat);
      });

      // Check if the coordinates are different before setting
      const coordinatesChanged = !selectedCoordinates.every((coord, index) =>
        areCoordinatesEqual(coord, coordinates[index])
      );

      if (coordinatesChanged) {
        setSelectedCoordinates(coordinates);
      }
    }
  };

  const paymentStatusTemplate = (rowData) => (
    <span
      className={`rounded-lg px-2 py-1 text-white ${
        rowData.payment_status ? "bg-green-500" : "bg-yellow-500"
      }`}
    >
      {rowData.payment_status ? "Done" : "Pending"}
    </span>
  );

  return (
    <div className="h-full overflow-auto ">
      <h2 className="mb-4 text-2xl font-semibold">User Preferences</h2>
      <DataTable
        value={userRequests}
        paginator
        rows={5}
        onRowClick={(e) => handleRowClick(e.data)}
      >
        <Column
          sortable
          field="area.area"
          header="Selected Area"
          className="cursor-alias"
        />
        <Column sortable field="plant.plant_name" header="Selected Plant" />
        <Column sortable field="no_of_plants" header="Number of Plants" />
        <Column
          sortable
          field="payment_status"
          header="Payment Status"
          body={paymentStatusTemplate}
        />
      </DataTable>
    </div>
  );
};

export default Component3;
