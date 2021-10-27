
import { useQuery } from 'react-query';
import { getCumIntegral, getMyFollowList, getMySteps } from 'services';
import { useHistory } from 'react-router-dom';
// import { useSearchParam } from 'react-use';

import { AvatarBox, GetPointButton, ToggleButton } from 'components/FloatComponents';
import { Col, Row, Space } from 'antd';
// import FollowButton from 'components/FollowButton';
import RunToolBar from 'components/RunBar';

import Map from 'components/Map';
import { useMemo, useState } from "react";
import StepPoint from "components/Map/stepPoint";
import UserDetailPanel from "components/Panels/UserDetailPanelV2";
import PersonPopup from "components/Popups/PersonPopup";

import styles from './index.module.scss';
import Treasures from 'components/Map/treasures';

function PersonMap() {

  const history = useHistory()

  // const userId = useSearchParam("user")
  const [popup, setPopup] = useState(true)
  const [userId, setUserId] = useState("")

  const follows = useQuery("follows", getMyFollowList)
  const mySteps = useQuery("mySteps", getMySteps, { enabled: !userId })
  const points = useQuery("points", getCumIntegral, { enabled: !userId })

  const { totalPoint, hasPoint } = useMemo(() => {
    return {
      totalPoint: points.data?.filter(item => item.flag === "2").reduce((prev, curr) => prev + parseInt(curr.point), 0).toString() || "0",
      hasPoint: points.data?.some(item => item.flag === "1") || false
    }
  }, [points.data])

  return (
    <div className={styles.main}>

      {/* 自己的顶栏 */}
      {/* todo */}
      {/* {!userId && <div className={styles.topBar}>
        <Row justify="space-between">
          <Col>
            <Space>
              <AvatarBox name={mySteps.data?.name} score={`${totalPoint} 分`} avatar={mySteps.data?.pic} />
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
      </div>} */}
      <div className={styles.topBar}>
        <Row justify="space-between">
          <Col>
            <Space>
              <AvatarBox name={mySteps.data?.name} score={`${totalPoint} 分`} avatar={mySteps.data?.pic} />
              <GetPointButton dot={hasPoint} />
            </Space>
          </Col>
          <Col><ToggleButton value="person" onChange={() => history.push("/team")} /></Col>
        </Row>
      </div>

      <div className={styles.bottomBar}>
        <RunToolBar hideDrawer={!!userId} onUserClick={setUserId} />
      </div>

      <Map>
        <Treasures />
        {follows.data?.map(user => (
          <StepPoint
            key={user.userId}
            step={user.allStep}
            center={userId === user.userId}
            onClick={() => setUserId(user.userId)}
          />
        ))}
        <StepPoint center={!userId} step={mySteps.data?.allStep || "0"} />
      </Map>

      <UserDetailPanel haveProp={false} visible={!!userId} userId={userId} onClose={() => setUserId("")} />
      <PersonPopup visible={popup} onClose={() => setPopup(false)} />
    </div>
  )
}

export default PersonMap
