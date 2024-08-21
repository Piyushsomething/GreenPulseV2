"use client";
import React, { useEffect, useState } from "react";
import AdminComponent1 from "@/components/AdminComponents/AdminComponent1";
import AdminComponent3 from "@/components/AdminComponents/AdminComponent3";
import AdminComponent4 from "@/components/AdminComponents/AdminComponent4";
import CesiumWrapper from "@/components/Cesium/CesiumWrapper";

const AdminPageComponent = () => {
  const [selectedArea, setSelectedArea] = useState([
    { x: 1262099.0963717857, y: 5466751.786890225, z: 3023368.6926637413 },
    { x: 1308619.690004065, y: 5463393.852931658, z: 3009721.662073896 },
    { x: 1251316.0690785071, y: 5481113.999219002, z: 3001915.3994118082 },
    { x: 1249809.8868682592, y: 5470116.446985142, z: 3022394.4940282907 },
  ]);
  const [loading, setLoading] = useState(false);

  const handleAreaSelect = (area) => {
    setLoading(true);

    setSelectedArea(area);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [selectedArea]);

  const handleCesiumLoad = () => {
    setLoading(false);
  };
  const [userRequests, setUserRequests] = useState([]);

  const handleUserRequest = (index, action) => {
    const newRequests = [...userRequests];
    newRequests[index].status = action;
    setUserRequests(newRequests);
  };

  return (
    <div className="grid grid-cols-1  md:grid-cols-4 md:grid-rows-7 gap-4 p-4 h-screen w-full">
      {/* Top-left div that spans two columns */}
      <div className="bg-gray-800 text-white p-6 rounded-lg flex flex-col justify-center items-center md:col-span-2 md:row-span-5">
      <CesiumWrapper
                    positions={selectedArea}
                    onCesiumLoad={handleCesiumLoad}
                    style={{ height: "100%", width: "100%" }}
                  />
        {/* Add icons or content here */}
      </div>

      {/* Top-right div */}
      <div className="bg-gray-800 text-white p-6 rounded-lg flex flex-col justify-center items-center md:col-span-2 md:row-span-2 overflow-auto">

      </div>

      {/* Bottom-left div */}
      <div className="bg-gray-800 text-white p-6 rounded-lg flex flex-col justify-center items-center md:col-span-2 md:row-span-2">
        <h2 className="text-xl font-bold mb-4">Integrated AI</h2>
        <p className="text-sm text-center">
          Proactive uses AI to help you create engaging content.
        </p>
        {/* Add AI content here */}
      </div>

      {/* Bottom-middle div that spans two rows */}
      <div className="bg-gray-800 text-white p-6 rounded-lg flex flex-col justify-center items-center md:col-span-2 md:row-span-3">
      <AdminComponent3/>

        {/* Add collaboration tools content here */}
      </div>

      {/* Bottom-right div */}
      <div className="bg-gray-800 text-white p-6 rounded-lg flex flex-col justify-center items-center md:col-span-2 md:row-span-2 overflow-auto">
      <AdminComponent4 />

        {/* Add audience insights content here */}
      </div>
    </div>
  );
};

export default AdminPageComponent;
