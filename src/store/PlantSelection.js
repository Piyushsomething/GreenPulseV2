// store.js
import { create } from "zustand";

const usePlantSelectionStore = create((set) => ({
  selectedArea: "",
  setSelectedArea: (area) => set({ selectedArea: area }),

  selectedCoordinates: [
    {
        "x": 1240423.8751717187,
        "y": 5459746.077883671,
        "z": 3044778.036778425
    },
    {
        "x": 1268993.9047406851,
        "y": 5453176.422489295,
        "z": 3044778.036778425
    },
    {
        "x": 1273788.2361576776,
        "y": 5473778.8343267925,
        "z": 3005819.2529076715
    },
    {
        "x": 1245110.267385981,
        "y": 5480373.3102543,
        "z": 3005819.252907671
    }
],
  setSelectedCoordinates: (cordinates) => set({ selectedCoordinates: cordinates }),

  selectedPlant: "",
  setSelectedPlant: (plant) => set({ selectedPlant: plant }),

  numberOfPlants: 0,
  setNumberOfPlants: (count) => set({ numberOfPlants: count }),

  areasData: [],
  setAreasData: (data) => set({ areasData: data }),

  plantsData: [],
  setPlantsData: (data) => set({ plantsData: data }),

  loadingAreas: true,
  setLoadingAreas: (loading) => set({ loadingAreas: loading }),

  loadingPlants: true,
  setLoadingPlants: (loading) => set({ loadingPlants: loading }),

  previewData: "",
  setPreviewData: (data) => set({ previewData: data }),

  userRequests: "",
  setUserRequests: (data) => set({ userRequests: data }),
}));

export default usePlantSelectionStore;
