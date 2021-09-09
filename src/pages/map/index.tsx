import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, ImageOverlay, Polyline, FeatureGroup, Circle } from 'react-leaflet'

import MapPNG from './img/map.png';

import { CRS, LatLngExpression } from 'leaflet';
import { EditControl } from "react-leaflet-draw"

// import "react-leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";

import styles from './index.module.scss';

import PolylineJSON from './polyline.json';
import UserToolBar from './components/userToolBar';
import RunToolBar from './components/runToolBar';

const Points: {position: LatLngExpression}[] = [
    {
        position: [1230, 1480]
    }
]

function Map() {

  return (
    <div className={styles.main}>
      <div className={styles.userToolBar}>
        <UserToolBar self={true} />
        <UserToolBar self={false} />
      </div>
      <div className={styles.runToolBar}>
        <RunToolBar />
      </div>
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
        <ImageOverlay url={MapPNG} bounds={[[0,0], [3361,3839]]} />
        {/* <FeatureGroup>
          <EditControl
            position='topright'
            onEdited={(a: any) => console.log("Edited", a)}
            onCreated={(a: any) => console.log("Created", a)}
            onDeleted={(a: any) => console.log("Deleted", a)}
            draw={{
              rectangle: false
            }}
          />
          <Polyline positions={PolylineJSON as any} />
        </FeatureGroup> */}
        <FeatureGroup>
          {Points.map(point => {
              return <Marker key={point.position.toString()} position={point.position} />
          })}
        </FeatureGroup>
      </MapContainer>
    </div>
  )
}

export default Map
