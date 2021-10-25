import { CSSProperties } from 'react';
import { CRS } from 'leaflet';
import { MapContainer, ImageOverlay } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

import MapPNG from './map.png';

interface MapProps {
  style?: CSSProperties;
}

const Map: React.FC<MapProps> = ({ style = { width: "100vw", height: "100vh" }, ...props }) => {

  return (
    <MapContainer
      crs={CRS.Simple}
      style={style}
      center={[1900, 1600]}
      zoom={-1.5}
      minZoom={-3}
      maxZoom={1}
      zoomControl={false}
      zoomDelta={0.5}
      zoomSnap={0.5}
      maxBounds={[[0, 0], [3361, 3839]]}
      // 超出拖动弹性值
      maxBoundsViscosity={1}
    >
      {/* <MapRoute myStep={mySteps?.data?.allStep || userDetail?.data?.allStep || "0"} /> */}
      {props.children}
      <ImageOverlay url={MapPNG} bounds={[[0, 0], [3361, 3839]]} />
    </MapContainer>
  )
}

export default Map
