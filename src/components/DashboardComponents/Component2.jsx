"use client";
import React, { useEffect, useState } from "react";
import CesiumWrapper from "../Cesium/CesiumWrapper";
import usePlantSelectionStore from "@/store/PlantSelection";

const Component2 = () => {
  const { selectedCoordinates } = usePlantSelectionStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCoordinates) {
      setLoading(true);
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [selectedCoordinates]);

  return (
    <div className="">
      <div className="md:h-[760px] h-full">
        {loading ? (
          <div className="flex items-center justify-center h-full">
                   <span className="loading loading-spinner loading-xs"></span>
          </div>
        ) : (
            selectedCoordinates && (
            <CesiumWrapper
              positions={selectedCoordinates}
              style={{ height: "100%", width: "100%" }}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Component2;