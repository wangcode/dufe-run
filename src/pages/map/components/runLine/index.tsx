import { latLng } from 'leaflet';
import React, { useEffect, useMemo, useState } from 'react';
import PolylineJSON from '../../polyline.json';
import GeoUtils from 'leaflet-geometryutil';

import { FeatureGroup, Marker, Polyline, useMap } from 'react-leaflet';
import { TOTAL_STEPS } from '../../../../services';

interface RunLineProps {
  myStep: string;
}

const RunLine: React.FC<RunLineProps> = ({ myStep }) => {

  const map = useMap()

  const [points, setPoints] = useState<any[]>([])

  const Path = useMemo(() => {
    return PolylineJSON.map(point => latLng(point[0], point[1]))
  }, [])

  // const {lengths, totalLength} = useMemo(() => {
  //   return {
  //     lengths: GeoUtils.accumulatedLengths(Path),
  //     totalLength: GeoUtils.accumulatedLengths(Path).reduce((a, b) => a + b, 0)
  //   }
  // }, [Path])



  // const totalPoints = Math.floor(totalLength / Interval);

  useEffect(() => {
    const MyLength = parseInt(myStep) / TOTAL_STEPS
    const point = GeoUtils.interpolateOnLine(map, Path, MyLength)
    setPoints([point])
  }, [myStep])
  // useEffect(() => {
  //   setTimeout(() => {
  //     const ratios = [];
  //     for (let i = 0; i <= totalPoints; i++) {
  //       const ratio = i / totalPoints;
  //       ratios.push(ratio);
  //     }

  //     const points = ratios.map((ratio) =>
  //       GeoUtils.interpolateOnLine(map, Path, ratio)
  //     );

  //     console.log(points)

  //     setPoints(points)

  //   }, 0);
  // }, [])

  return (
    <FeatureGroup>
      {points.map((item, index) => <Marker key={index} position={item.latLng} />)}
      {/* <Polyline color="#ffffff00" positions={Path} /> */}
      <Polyline positions={Path} />
    </FeatureGroup>
  )
}

export default RunLine;
