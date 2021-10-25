import React, { useEffect, useMemo, useState } from 'react'
import { MapContainer, ImageOverlay } from 'react-leaflet'

import MapPNG from '../map/img/map.png';

import { CRS, latLng, LatLngExpression } from 'leaflet';

import GeoUtils from 'leaflet-geometryutil';

// import { EditControl } from "react-leaflet-draw"

// import "react-leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";


// import { useSearchParam } from 'react-use';
import { useQuery } from 'react-query';
import { getMySteps, getSomeoneStep } from 'services';
import { useHistory, useLocation } from 'react-router-dom';
import { useSearchParam } from 'react-use';

import styles from './index.module.scss';
import { AvatarBox, GetPointButton, ToggleButton } from 'components/FloatComponents';
import { Col, Row, Space } from 'antd';
import FollowButton from 'components/FollowButton';
import RunToolBar from 'components/RunBar';

import Map from 'components/Map';
import MapRoute from 'components/Map/route';

const Points: { position: LatLngExpression }[] = [
  {
    position: [1230, 1480]
  }
]

const Interval = 20000000;

function PersonMap() {

  const history = useHistory()

  const userId = useSearchParam("user")

  const [myStep, setMyStep] = useState(0)


  const userDetail = useQuery(["user", userId, "detail"], () => getSomeoneStep(userId!), { enabled: !!userId })
  const mySteps = useQuery("mySteps", getMySteps, { enabled: !userId })


  return (
    <div className={styles.main}>

      {/* 自己的顶栏 */}
      {!userId && <div className={styles.topBar}>
        <Row justify="space-between">
          <Col>
            <Space>
              <AvatarBox score="123分" avatar="123" />
              <GetPointButton />
            </Space>
          </Col>
          <Col><ToggleButton value="person" onChange={() => history.push("/team")} /></Col>
        </Row>
      </div>}

      {!!userId && <div className={styles.topBar2}>
        <Row justify="space-between">
          <Col>
            <Space>
              <AvatarBox name="孟浩" number="123分" avatar="123" />
              <FollowButton border={false} userId="1" follow={false} followId={"1"} />
            </Space>
          </Col>
        </Row>
      </div>}

      <div className={styles.bottomBar}>
        <RunToolBar />
      </div>

      <Map>
        <MapRoute myStep={mySteps.data?.allStep || "0"} />
      </Map>
    </div>
  )
}

export default PersonMap
