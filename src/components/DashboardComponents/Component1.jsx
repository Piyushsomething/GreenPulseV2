"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";
import usePlantSelectionStore from "@/store/PlantSelection";
import { Cartesian3 } from "cesium";

const Component1 = () => {
  const router = useRouter();
  const {
    selectedArea,
    setSelectedArea,
    setSelectedCoordinates,
    areasData,
    setAreasData,
    loadingAreas,
    setLoadingAreas,
    selectedPlant,
    setSelectedPlant,
    plantsData,
    setPlantsData,
    loadingPlants,
    setLoadingPlants,
    numberOfPlants,
    setNumberOfPlants,
    setPreviewData,
  } = usePlantSelectionStore();

  useEffect(() => {
    const fetchAreasData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/area/`);
        const data = await response.json();
        setAreasData(data);
      } catch (error) {
        console.error("Error fetching areas data:", error);
      } finally {
        setLoadingAreas(false);
      }
    };

    const fetchPlantsData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/plants/`);
        const data = await response.json();
        setPlantsData(data);
      } catch (error) {
        console.error("Error fetching plants data:", error);
      } finally {
        setLoadingPlants(false);
      }
    };

    fetchAreasData();
    fetchPlantsData();
  }, []);

  const handleAreaChange = (e) => {
    const selectedAreaName = e.value;
    setSelectedArea(selectedAreaName);
    const area = areasData.find((area) => area.area === selectedAreaName);

    if (area) {
      const coordinates = area.lat[0].split(" ").map((lat, index) => {
        const lon = area.lon[0].split(" ")[index];
        const parsedLat = parseFloat(lat);
        const parsedLon = parseFloat(lon);
        return Cartesian3.fromDegrees(parsedLon, parsedLat);
      });
      setSelectedCoordinates(coordinates);
      console.log("selected coordinates", coordinates);
    }
  };

  const handlePreview = async () => {
    const preview = `Selected Area: ${selectedArea}\nSelected Plant: ${selectedPlant}\nNumber of Plants: ${numberOfPlants}`;
    setPreviewData(preview);
    const alertMessage = `Preview Data:\n${preview}\n\nProceed to payment...`;

    if (window.confirm(alertMessage)) {
      try {
        const token = Cookies.get("access_token_login");
        if (!token) {
          throw new Error("Token not found in cookies.");
        }

        const selectedAreaObj = areasData.find(
          (area) => area.area === selectedArea
        );
        const selectedPlantObj = plantsData.find(
          (plant) => plant.plant_name === selectedPlant
        );

        if (!selectedAreaObj || !selectedPlantObj) {
          throw new Error("Selected area or plant is invalid.");
        }

        const response = await fetch(`http://127.0.0.1:8000/tickets/`, {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payment_status: false,
            selected_area: selectedAreaObj.id,
            selected_plants: selectedPlantObj.id,
            no_of_plants: numberOfPlants,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error submitting ticket:", errorData);
          throw new Error(errorData.detail || "Unknown error");
        }

        router.push("/status");
      } catch (error) {
        console.error("Error submitting ticket:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="p-4 h-full">
      <h2 className="text-2xl font-semibold mb-4">Select Options</h2>
      <div className="mb-4">
        <label htmlFor="area" className="block text-gray-700 font-bold mb-2">
          Select Area:
        </label>
        {loadingAreas ? (
          <div>Loading...</div>
        ) : (
          <Dropdown
          filter
            id="area"
            className="w-full"
            value={selectedArea}
            options={areasData.map((area) => ({
              label: area.area,
              value: area.area,
            }))}
            onChange={handleAreaChange}
            placeholder="Select Area"
          />
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="plant" className="block text-gray-700 font-bold mb-2">
          Select Variety of Plant:
        </label>
        {loadingPlants ? (
          <div>Loading...</div>
        ) : (
          <Dropdown
          filter
            id="plant"
            className="w-full"
            value={selectedPlant}
            options={plantsData.map((plant) => ({
              label: plant.plant_name,
              value: plant.plant_name,
            }))}
            onChange={(e) => setSelectedPlant(e.value)}
            placeholder="Select Plant"
          />
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="numberOfPlants"
          className="block text-gray-700 font-bold mb-2"
        >
          Number of Plants:
        </label>
        <InputNumber
          id="numberOfPlants"
          value={numberOfPlants}
          onValueChange={(e) => setNumberOfPlants(e.value)}
          min={0}
          className="w-full"
        />
        <Slider
          value={numberOfPlants}
          onChange={(e) => setNumberOfPlants(e.value)}
          min={0}
          max={1000}
          className="w-full mt-2"
        />
      </div>
      <Button label="Preview" onClick={handlePreview} className="w-full" />
    </div>
  );
};

export default Component1;
