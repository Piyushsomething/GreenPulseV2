"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { Cartesian3 } from "cesium";

const AdminComponent1 = ({ onareaSelect }) => {
  const router = useRouter();

  const [areas, setAreas] = useState([]);
  const [selectedArea, setLocalSelectedArea] = useState("");
  const [selectedPlant, setSelectedPlant] = useState("");
  const [selectedLatitude, setSelectedLatitude] = useState("");
  const [selectedLongitude, setSelectedLongitude] = useState("");

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_GREENPULSE}/area/`);
        const data = await response.json();
        setAreas(data);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };
    fetchAreas();
  }, []);

  const handleAddArea = () => {
    if (
      selectedArea &&
      selectedPlant &&
      selectedLatitude &&
      selectedLongitude
    ) {
      setAreas([
        ...areas,
        {
          area: selectedArea,
          lat: [selectedLatitude],
          lon: [selectedLongitude],
        },
      ]);
      setLocalSelectedArea("");
      setSelectedPlant("");
      setSelectedLatitude("");
      setSelectedLongitude("");
    }
  };

  const handleRemoveArea = (index) => {
    const newAreas = areas.filter((_, i) => i !== index);
    setAreas(newAreas);
  };

  const handleAreaSelect = (area) => {
    const vare = [
      Cartesian3.fromDegrees(parseFloat(area.lon[0]), parseFloat(area.lat[0])),
      Cartesian3.fromDegrees(parseFloat(area.lon[1]), parseFloat(area.lat[1])),
      Cartesian3.fromDegrees(parseFloat(area.lon[2]), parseFloat(area.lat[2])),
      Cartesian3.fromDegrees(parseFloat(area.lon[3]), parseFloat(area.lat[3])),
    ];
    console.log("Cartisian,fromDegree: ", vare);
    onareaSelect(vare);
  };

  return (
    <div className="p-4 h-full overflow-auto">
      <h2 className="text-2xl font-semibold mb-4">Manage Plant Areas</h2>
      <div className="mb-4">
        <label htmlFor="area" className="block text-gray-700 font-bold mb-2">
          Area Name:
        </label>
        <input
          id="area"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:outline-none"
          value={selectedArea}
          onChange={(e) => setLocalSelectedArea(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="plant" className="block text-gray-700 font-bold mb-2">
          Plant Variety:
        </label>
        <input
          id="plant"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:outline-none"
          value={selectedPlant}
          onChange={(e) => setSelectedPlant(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="latitude"
          className="block text-gray-700 font-bold mb-2"
        >
          Plant Latitude:
        </label>
        <input
          id="latitude"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:outline-none"
          value={selectedLatitude}
          onChange={(e) => setSelectedLatitude(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="longitude"
          className="block text-gray-700 font-bold mb-2"
        >
          Plant Longitude:
        </label>
        <input
          id="longitude"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:outline-none"
          value={selectedLongitude}
          onChange={(e) => setSelectedLongitude(e.target.value)}
        />
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none mb-4"
        onClick={handleAddArea}
      >
        Add Area
      </button>
      <table className="table w-full mb-4">
        <thead>
          <tr>
            <th>Area</th>
            <th>Plant Variety</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {areas.map((area, index) => (
            <tr key={index} onClick={() => handleAreaSelect(area)}>
              <td>{area.area}</td>
              <td>{area.variety}</td>
              <td>{area.lat}</td>
              <td>{area.lon}</td>
              <td>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent onClick for row when clicking the button
                    handleRemoveArea(index);
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminComponent1;
