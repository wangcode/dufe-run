import { latLng } from 'leaflet';
import React, { useMemo } from 'react';
import GeoUtils from 'leaflet-geometryutil';

import { Marker, useMap } from 'react-leaflet';
import { TOTAL_STEPS } from 'services';
import PolylineJSON from './polyline.json';
import { getPersonMark } from './marks';

interface StepPointProps {
  step: string;
  size?: [number, number];
  center?: boolean;
  onClick?: () => void;
  polyline?: number[][];
}

const StepPoint: React.FC<StepPointProps> = ({ step, size, center, onClick, polyline = PolylineJSON }) => {

  const map = useMap()

  const Path = useMemo(() => {
    return polyline.map(point => latLng(point[0], point[1]))
  }, [polyline])

  const point = useMemo(() => {
    const MyLength = parseInt(step) / TOTAL_STEPS
    const point = GeoUtils.interpolateOnLine(map, Path, MyLength)
    center && map.flyTo(point?.latLng!)
    return point?.latLng
  }, [Path, map, step, center])

  return (
    point ?
      <Marker
        icon={getPersonMark(size)}
        position={point}
        eventHandlers={{
          click: () => onClick?.()
        }}
      /> : null
  )
}

export default StepPoint;
