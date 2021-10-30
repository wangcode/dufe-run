// import React, { useEffect, useMemo, useState } from 'react'
import { MapContainer, ImageOverlay, FeatureGroup } from 'react-leaflet'

import MapPNG from './img/map45.jpg';

import { CRS } from 'leaflet';

// import GeoUtils from 'leaflet-geometryutil';

import { EditControl } from "react-leaflet-draw"
import 'leaflet-draw/dist/leaflet.draw.css'

import "leaflet/dist/leaflet.css";

import styles from './index.module.scss';

// import { getMySteps, getSomeoneStep } from 'services';
// import { useLocation } from 'react-router-dom';
// import { useSearchParam } from 'react-use';

// const Points: { position: LatLngExpression }[] = [
//   {
//     position: [1230, 1480]
//   }
// ]

// const Interval = 20000000;

function Map() {


  // const userId = useSearchParam("user")
  // const type = useSearchParam("type") || "person"

  // const [myStep, setMyStep] = useState(0)
  // useEffect(() => {
  //   if(myStep===100000) setMyStep(0)
  //   setTimeout(() => {
  //     setMyStep(myStep+100)
  //   }, 100)
  //   // setInterval(() => {
  //   //   // console.log(myStep+10)
  //   //   // setMyStep(myStep+10)
  //   // }, 10)
  // }, [myStep])

  // const Path = useMemo(() => {
  //   return PolylineJSON.map(point => latLng(point[0], point[1]))
  // }, [PolylineJSON])

  // const {lengths, totalLength} = useMemo(() => {
  //   return {
  //     lengths: GeoUtils.accumulatedLengths(Path),
  //     totalLength: GeoUtils.accumulatedLengths(Path).reduce((a, b) => a + b, 0)
  //   }
  // }, [Path])

  // const totalPoints = Math.floor(totalLength / Interval);

  // useEffect(() => {
  //   setTimeout(() => {
  //     const ratios = [];
  //     for (let i = 0; i <= totalPoints; i++) {
  //       const ratio = i / totalPoints;
  //       ratios.push(ratio);
  //     }
  //     console.log(ratios)
  //   }, 0);
  // }, [])


  // const points = ratios.map((ratio) =>
  //   GeoUtils.interpolateOnLine(map, Path, ratio)
  // );


  // console.log(points)

  return (
    <div className={styles.main}>
      <MapContainer
        crs={CRS.Simple}
        style={{ width: "100vw", height: "100vh" }}
        center={[1900, 1600]}
        zoom={-1.5}
        minZoom={-3}
        maxZoom={1}
        zoomControl={false}
        zoomDelta={0.5}
        zoomSnap={0.5}
        maxBounds={[[0, 0], [3361, 3845]]}
        // 超出拖动弹性值
        maxBoundsViscosity={1}
      >
        <FeatureGroup>
          <EditControl onCreated={(e: any) => console.log(e.layer._latlng)} onEdited={console.log} draw={{}} position="bottomleft" />
        </FeatureGroup>
        <ImageOverlay url={MapPNG} bounds={[[0, 0], [3361, 3845]]} />
      </MapContainer>
    </div>
  )
}

export default Map
