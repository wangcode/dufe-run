
import "leaflet/dist/leaflet.css";


// import { useSearchParam } from 'react-use';
import { useQuery } from 'react-query';
import { getCumIntegral, getMyFollowList, getMySteps, getSomeoneStep } from 'services';
import { useHistory } from 'react-router-dom';
import { useSearchParam } from 'react-use';

import styles from './index.module.scss';
import { AvatarBox, GetPointButton, ToggleButton } from 'components/FloatComponents';
import { Col, Row, Space } from 'antd';
import FollowButton from 'components/FollowButton';
import RunToolBar from 'components/RunBar';

import Map from 'components/Map';
import { useMemo, useState } from "react";
import StepPoint from "components/Map/stepPoint";
import UserDetailPanel from "components/Panels/UserDetailPanelV2";
import PersonPopup from "components/Popups/PersonPopup";


function PersonMap() {

  const history = useHistory()

  const userId = useSearchParam("user")

  const [popup, setPopup] = useState(true)

  const [selectUserId, setSelectUserId] = useState("")

  const mySteps = useQuery("mySteps", getMySteps, { enabled: !userId })

  const follows = useQuery("follows", getMyFollowList)

  const points = useQuery("points", getCumIntegral, { enabled: !userId })
  const { totalPoint, hasPoint } = useMemo(() => {
    return {
      totalPoint: points.data?.filter(item => item.flag === "2").reduce((prev, curr) => prev + parseInt(curr.point), 0).toString() || "0",
      hasPoint: points.data?.some(item => item.flag === "1") || false
    }
  }, [points.data])


  const userDetail = useQuery(["user", userId, "detail"], () => getSomeoneStep(userId!), { enabled: !!userId })

  return (
    <div className={styles.main}>

      {/* 自己的顶栏 */}
      {/* todo */}
      {!userId && <div className={styles.topBar}>
        <Row justify="space-between">
          <Col>
            <Space>
              <AvatarBox score={`${totalPoint} 分`} avatar={mySteps.data?.pic} />
              <GetPointButton dot={hasPoint} />
            </Space>
          </Col>
          <Col><ToggleButton value="person" onChange={() => history.push("/team")} /></Col>
        </Row>
      </div>}

      {!!userId && userDetail.data && <div className={styles.topBar2}>
        <Row justify="space-between">
          <Col>
            <Space>
              <AvatarBox name={userDetail.data.name} number={`${userDetail.data.allKm}KM`} avatar={userDetail.data.pic} />
              <FollowButton
                border={false}
                userId={userDetail.data.userId}
                follow={userDetail.data.followFlag === "1"}
                followId={userDetail.data.followId}
              />
            </Space>
          </Col>
        </Row>
      </div>}

      <div className={styles.bottomBar}>
        <RunToolBar />
      </div>

      <Map>
        {follows.data?.map(user => (
          <StepPoint
            key={user.userId}
            step={user.allStep}
            center={selectUserId === user.userId}
            onClick={() => setSelectUserId(user.userId)}
          />
        ))}
        <StepPoint center step={mySteps.data?.allStep || "4000"} />
      </Map>

      <UserDetailPanel haveProp={false} visible={!!selectUserId} userId={selectUserId} onClose={() => setSelectUserId("")} />
      <PersonPopup visible={popup} onClose={() => setPopup(false)} />
    </div>
  )
}

export default PersonMap
