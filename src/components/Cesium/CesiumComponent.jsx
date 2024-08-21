import React, { useEffect, useRef, useState } from 'react';
import { dateToJulianDate } from './date';
import 'cesium/Build/Cesium/Widgets/widgets.css';

export const CesiumComponent = ({ CesiumJs, positions, style }) => {
    const cesiumViewer = useRef(null);
    const cesiumContainerRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (cesiumViewer.current === null && cesiumContainerRef.current) {
            //OPTIONAL: Assign access Token here
            //Guide: https://cesium.com/learn/ion/cesium-ion-access-tokens/
            CesiumJs.Ion.defaultAccessToken = `${process.env.NEXT_PUBLIC_CESIUM_TOKEN}`;

            //NOTE: Always utilize CesiumJs; do not import them from "cesium"
            cesiumViewer.current = new CesiumJs.Viewer(cesiumContainerRef.current, {
                //Using the Sandcastle example below
                //https://sandcastle.cesium.com/?src=3D%20Tiles%20Feature%20Styling.html
                terrain: CesiumJs.Terrain.fromWorldTerrain()
                // terrain: CesiumJs.Terrain.fromWorldTerrain()
            });

            //NOTE: Example of configuring a Cesium viewer
            cesiumViewer.current.clock.clockStep = CesiumJs.ClockStep.SYSTEM_CLOCK_MULTIPLIER;
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {

        if (cesiumViewer.current === null && cesiumContainerRef.current) {
            cesiumViewer.current = new CesiumJs.Viewer(cesiumContainerRef.current);
            cesiumViewer.current.clock.clockStep = CesiumJs.ClockStep.SYSTEM_CLOCK_MULTIPLIER;
        }
    }, []);

    useEffect(() => {
        if (isLoaded && cesiumViewer.current !== null) {
            // Use the positions prop to create the polygon coordinates
            const polygonCoordinates = positions;

            // Add the polygon entity
            cesiumViewer.current.entities.add({
                polygon: {
                    hierarchy: polygonCoordinates,
                    material: CesiumJs.Color.GREEN.withAlpha(0.5),
                    outline: true,
                    outlineColor: CesiumJs.Color.BLACK
                }
            });

            // Zoom to the polygon
            console.log("Polygon Coordinates:", polygonCoordinates);

            const boundingSphere = CesiumJs.BoundingSphere.fromPoints(polygonCoordinates);
            cesiumViewer.current.camera.viewBoundingSphere(boundingSphere, new CesiumJs.HeadingPitchRange(0, -0.5, boundingSphere.radius));
        }
    }, [positions, isLoaded]);

    useEffect(() => {
        // Set the loaded state when the viewer is initialized
        if (cesiumViewer.current !== null) {
            setIsLoaded(true);
        }
    }, [CesiumJs]);

    return (
        <div
            ref={cesiumContainerRef}
            id='cesium-container'
            // style={{ height: '70vh', width: '60vw' }}
            style={style}
        />
    );
};

export default CesiumComponent;
