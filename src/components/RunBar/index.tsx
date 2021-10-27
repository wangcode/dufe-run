import React, { useState } from 'react';

import PersonProgressPanel from 'components/Panels/ProgressPanel';
import TeamProgressPanel from 'components/Panels/TeamProgressPanel';
import SNSPanel from 'components/Panels/SNSPanel';
import MyTeamPanel from 'components/Panels/MyTeamPanel';

import foot from 'assets/images/foot_icon.png';
import logo from 'assets/images/logo_btn.png';

import styles from './index.module.scss';
import ProgressPanel from 'components/Panels/ProgressPanel';
import PropsPanel from 'components/Panels/PropsPanel';
import { TOTAL_LENGTH } from 'services';
import { useHistory } from 'react-router';

interface RunBarProps {
  mode?: "person" | "team";
  onUserClick?: (id: string) => void;
  hideDrawer?: boolean;
}

const RunToolBar: React.FC<RunBarProps> = ({ mode = "person", onUserClick, hideDrawer }) => {

  const history = useHistory()

  const [visible, setVisible] = useState(false)

  const [toastVisible, setToastVisible] = useState(false)
  const [teamProgressVisible, setTeamProgressVisible] = useState(false)
  const [followVisible, setFollowVisible] = useState(false)
  const [myTeamVisible, setMyTeamVisible] = useState(false)
  const [propsVisible, setPropsVisible] = useState(false)

  return (
    <div className={styles.toolbar}>
      {mode === "person" && <div className={styles.line}>
        <div className={styles.detail} onClick={() => setVisible(true)} >
          <img src={logo} alt="logo" />
          <div>全程 {TOTAL_LENGTH / 1000} 公里</div>
          {/* <div className={styles.followBtn} onClick={() => setFollowVisible(true)} >我的关注</div> */}
        </div>
        <div>
          {toastVisible && <div className={styles.toast}>
            <img className={styles.foot} src={foot} alt="" />
            <span className={styles.text}>收起手机，走一走</span>
          </div>}
          <div className={styles.startBtn} onClick={() => setToastVisible(true)}>GO</div>
        </div>
        <div className={styles.right}>
          <div onClick={() => history.push("/introduction/person")}>比赛规则 {'>'}</div>
          <div className={styles.followBtn} onClick={() => setFollowVisible(true)} >我的关注</div>
        </div>
      </div>}
      {mode === "team" && <div className={styles.line}>
        <div className={styles.detail}>
          <img src={logo} alt="logo" onClick={() => setTeamProgressVisible(true)} />
          <div className={styles.followBtn} onClick={() => setMyTeamVisible(true)} >战队信息</div>
        </div>
        <div>
          {toastVisible && <div className={styles.toast}>
            <img className={styles.foot} src={foot} alt="" />
            <span className={styles.text}>收起手机，走一走</span>
          </div>}
          <div className={styles.startBtn} onClick={() => setToastVisible(true)}>GO</div>
        </div>
        <div className={styles.right}>
          <div onClick={() => history.push("/introduction/team")}>比赛规则 {'>'}</div>
          <div className={styles.followBtn} onClick={() => setPropsVisible(true)} >道具记录</div>
        </div>
      </div>}
      <ProgressPanel destroyOnClose visible={!hideDrawer && visible} onClose={() => setVisible(false)} />
      <TeamProgressPanel destroyOnClose height="50vh" visible={!hideDrawer && teamProgressVisible} onClose={() => setTeamProgressVisible(false)} />
      <SNSPanel destroyOnClose height="55vh" visible={!hideDrawer && followVisible} onClose={() => setFollowVisible(false)} onUserClick={onUserClick} />
      <MyTeamPanel destroyOnClose height="85vh" visible={!hideDrawer && myTeamVisible} onClose={() => setMyTeamVisible(false)} onUserClick={onUserClick} />
      <PropsPanel destroyOnClose height="60vh" visible={!hideDrawer && propsVisible} onClose={() => setPropsVisible(false)} onUserClick={onUserClick} />
    </div>
  )

}

export default RunToolBar;
