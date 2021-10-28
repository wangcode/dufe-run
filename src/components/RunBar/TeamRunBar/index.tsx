import React, { useState } from 'react';
import { useHistory } from 'react-router';

import TeamProgressPanel from 'components/Panels/TeamProgressPanel';
import MyTeamPanel from 'components/Panels/MyTeamPanel';
import PropsPanel from 'components/Panels/PropsPanel';

import foot from 'assets/images/foot_icon.png';
import logo from 'assets/images/logo_btn.png';

import styles from './index.module.scss';

interface TeamRunBarProps {
  hideDrawer?: boolean;
  onUserClick?: (id: string) => void;
}

const TeamRunBar: React.FC<TeamRunBarProps> = ({ onUserClick, hideDrawer }) => {

  const history = useHistory()

  const [toastVisible, setToastVisible] = useState(false)
  const [teamProgressVisible, setTeamProgressVisible] = useState(false)
  const [myTeamVisible, setMyTeamVisible] = useState(false)
  const [propsVisible, setPropsVisible] = useState(false)

  return (
    <div className={styles.toolbar}>
      <div className={styles.line}>
        <div className={styles.detail}>
          <img src={logo} alt="logo" onClick={() => setTeamProgressVisible(true)} />
          <div className={styles.followBtn} onClick={() => setMyTeamVisible(true)} >战队信息</div>
        </div>
        <div>
          {toastVisible && <div className={styles.toast}>
            <img className={styles.foot} src={foot} alt="" />
            <span className={styles.text}>收起手机，走一走</span>
          </div>}
          <div className={styles.startBtn} onClick={() => setToastVisible(!propsVisible)}>GO</div>
        </div>
        <div className={styles.right}>
          <div onClick={() => history.push("/introduction/team")}>比赛规则 {'>'}</div>
          <div className={styles.followBtn} onClick={() => setPropsVisible(true)} >道具记录</div>
        </div>
      </div>
      
      <TeamProgressPanel destroyOnClose height="50vh" visible={!hideDrawer && teamProgressVisible} onClose={() => setTeamProgressVisible(false)} />
      <MyTeamPanel destroyOnClose height="85vh" visible={!hideDrawer && myTeamVisible} onClose={() => setMyTeamVisible(false)} onUserClick={onUserClick} />

      <PropsPanel destroyOnClose height="60vh" visible={!hideDrawer && propsVisible} onClose={() => setPropsVisible(false)} onUserClick={onUserClick} />

    </div>
  )

}

export default TeamRunBar;
