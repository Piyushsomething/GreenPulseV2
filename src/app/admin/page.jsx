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
    <div className="flex h-screen flex-col">
      <div className="relative flex flex-1 flex-col overflow-hidden md:flex-row">
        <div className="h-full w-full overflow-auto md:w-1/6">
          <AdminComponent1 onareaSelect={handleAreaSelect} />
        </div>
        <div className="h-full w-full overflow-auto md:w-3/6">
          <div className="h-full bg-green-200 object-contain">
            <div className="h-full" style={{ height: "calc(100vh - 5.8rem)" }}>
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <span className="loading loading-spinner loading-xs"></span>
                </div>
              ) : (
                selectedArea && (
                  <CesiumWrapper
                    positions={selectedArea}
                    onCesiumLoad={handleCesiumLoad}
                    style={{ height: "100%", width: "100%" }}
                  />
                )
              )}
            </div>
          </div>
        </div>
        <div className="flex h-full w-full flex-col overflow-auto md:w-2/6">
          <div className="flex-1 overflow-auto">
            <AdminComponent3
              userRequests={userRequests}
              handleUserRequest={handleUserRequest}
            />
          </div>
          <div className="flex-1 overflow-auto">
            <AdminComponent4 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPageComponent;
