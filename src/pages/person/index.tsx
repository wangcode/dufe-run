import { Space } from 'antd';
import { useQuery } from 'react-query';
import { useMemo, useState } from "react";
import { useHistory } from 'react-router-dom';

import Map from 'components/Map';
import StepPoint from "components/Map/stepPoint";
import Treasures from 'components/Map/treasures';
import PersonPopup from "components/Popups/PersonPopup";
import PersonRunBar from 'components/RunBar/PersonRunBar';
import UserDetailPanel from "components/Panels/UserDetailPanelV2";
import { AvatarBox, GetPointButton, ToggleButton } from 'components/FloatComponents';

import { getCumIntegral, getMyFollowList, getMySteps } from 'services';

import styles from './index.module.scss';
import SelfDetailPanel from 'components/Panels/SelfDetailPanel';

function PersonMap() {

  const history = useHistory()

  const [selfVisible, setSelfVisible] = useState(false)
  const [popup, setPopup] = useState(true)
  const [userId, setUserId] = useState("")

  const follows = useQuery("follows", getMyFollowList)
  const mySteps = useQuery("mySteps", getMySteps, { enabled: !userId })
  const points = useQuery("points", getCumIntegral, { enabled: !userId })

  const hasPoint = useMemo(() => {
    return points.data?.some(item => item.flag === "1") || false
  }, [points.data])

  const handleGoTeam = () => {
    if (mySteps.data?.teamId) {
      history.replace("/team")
    } else {
      history.replace("/teamselect")
    }
  }

  return (
    <div className={styles.main}>

      <div className={styles.topBar}>
        <Space>
          <AvatarBox name={mySteps.data?.name} score={`${mySteps.data?.allPoint || 0} 分`} avatar={mySteps.data?.pic} />
          <GetPointButton dot={hasPoint} />
        </Space>
        <ToggleButton value="person" onChange={handleGoTeam} />
      </div>

      <Map>
        <Treasures />
        {follows.data?.map(user => (
          <StepPoint
            key={user.userId}
            step={user.allStep || "0"}
            center={userId === user.userId}
            onClick={() => setUserId(user.userId)}
          />
        ))}
        <StepPoint center={!userId && selfVisible} step={mySteps.data?.allStep || "0"} onClick={() => setSelfVisible(true)} />
      </Map>

      <div className={styles.bottomBar}>
        <PersonRunBar hideDrawer={!!userId} onUserClick={setUserId} />
      </div>

      <UserDetailPanel height="240px" haveProp={false} visible={!!userId} userId={userId} maskClosable={false} onClose={() => setUserId("")} />
      <SelfDetailPanel height="230px" visible={selfVisible} onClose={() => setSelfVisible(false)} />
      <PersonPopup visible={popup} onClose={() => setPopup(false)} />

    </div>
  )
}

export default PersonMap
