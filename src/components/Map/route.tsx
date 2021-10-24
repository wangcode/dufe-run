import { latLng } from 'leaflet';
import React, { useEffect, useMemo, useState } from 'react';
import GeoUtils from 'leaflet-geometryutil';

import { FeatureGroup, Marker, Polyline, useMap } from 'react-leaflet';
import { TOTAL_STEPS } from 'services';
import PolylineJSON from './polyline.json';

interface MapRouteProps {
  myStep: string;
  polyline?: number[][]
}

const MapRoute: React.FC<MapRouteProps> = ({ myStep, polyline = PolylineJSON }) => {

  const map = useMap()

  const [points, setPoints] = useState<any[]>([])

  const Path = useMemo(() => {
    return polyline.map(point => latLng(point[0], point[1]))
  }, [polyline])

  useEffect(() => {
    const MyLength = parseInt(myStep) / TOTAL_STEPS
    const point = GeoUtils.interpolateOnLine(map, Path, MyLength)
    setPoints([point])
  }, [Path, map, myStep])

  return (
    <FeatureGroup>
      {points.map((item, index) => <Marker key={index} position={item.latLng} />)}
      <Polyline positions={Path} />
    </FeatureGroup>
  )
}

export default MapRoute;