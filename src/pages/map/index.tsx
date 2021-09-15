import React, { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, ImageOverlay, Polyline, FeatureGroup, Circle, useMap } from 'react-leaflet'

import MapPNG from './img/map.png';

import { CRS, latLng, LatLngExpression } from 'leaflet';

import GeoUtils from 'leaflet-geometryutil';

// import { EditControl } from "react-leaflet-draw"

// import "react-leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";

import styles from './index.module.scss';

import PolylineJSON from './polyline.json';
import UserToolBar, { OtherToolBar } from './components/userToolBar';
import RunToolBar from './components/runToolBar';
import UserMark from './components/userMark';
import RunLine from './components/runLine';
import { useSearchParam } from 'react-use';
import { useQuery } from 'react-query';
import { getMySteps, getSomeoneStep } from '../../services';

const Points: {position: LatLngExpression}[] = [
    {
        position: [1230, 1480]
    }
]

const Interval = 20000000;

function Map() {

  const [myStep, setMyStep] = useState(0)

  const userId = useSearchParam("user")

  const userDetail = useQuery(["user", userId, "detail"], () => getSomeoneStep(userId!), {enabled: !!userId})
  const mySteps = useQuery("mySteps", getMySteps, {enabled: !userId})

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
      <div className={styles.userToolBar}>
        {!userId && <UserToolBar self={true} />}
        {userId && <OtherToolBar userId={userId} />}
      </div>
      {!userId && <div className={styles.runToolBar}>
        <RunToolBar />
      </div>}
      <MapContainer
        crs={CRS.Simple}
        style={{width: "100vw", height:"100vh"}}
        center={[1900, 1600]}
        zoom={-1.5}
        minZoom={-3}
        maxZoom={1}
        zoomControl={false}
        zoomDelta={0.5}
        zoomSnap={0.5}
        maxBounds={[[0,0], [3361,3839]]}
        // 超出拖动弹性值
        maxBoundsViscosity={1}
      >
        <RunLine myStep={mySteps?.data?.allStep||userDetail?.data?.allStep||"0"} />
        <ImageOverlay url={MapPNG} bounds={[[0,0], [3361,3839]]} />
      </MapContainer>
    </div>
  )
}

export default Map
