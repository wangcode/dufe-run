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

function PersonMap() {

  const history = useHistory()

  const [popup, setPopup] = useState(true)
  const [userId, setUserId] = useState("")

  const follows = useQuery("follows", getMyFollowList)
  const mySteps = useQuery("mySteps", getMySteps, { enabled: !userId })
  const points = useQuery("points", getCumIntegral, { enabled: !userId })

  const hasPoint = useMemo(() => {
    return points.data?.some(item => item.flag === "1") || false
  }, [points.data])

  return (
    <div className={styles.main}>

      <div className={styles.topBar}>
        <Space>
          <AvatarBox name={mySteps.data?.name} score={`${mySteps.data?.allPoint || 0} 分`} avatar={mySteps.data?.pic} />
          <GetPointButton dot={hasPoint} />
        </Space>
        <ToggleButton value="person" onChange={() => history.replace("/team")} />
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
        <StepPoint center={!userId} step={mySteps.data?.allStep || "0"} />
      </Map>

      <div className={styles.bottomBar}>
        <PersonRunBar hideDrawer={!!userId} onUserClick={setUserId} />
      </div>

      <UserDetailPanel haveProp={false} visible={!!userId} userId={userId} onClose={() => setUserId("")} />

      <PersonPopup visible={popup} onClose={() => setPopup(false)} />

    </div>
  )
}

export default PersonMap
