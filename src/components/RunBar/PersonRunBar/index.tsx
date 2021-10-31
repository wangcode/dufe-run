import React, { useState } from 'react';
import { useHistory } from 'react-router';

import SNSPanel from 'components/Panels/SNSPanel';
import ProgressPanel from 'components/Panels/ProgressPanel';

import foot from 'assets/images/foot_icon.png';
import logo from 'assets/images/logo_btn.png';

import { TOTAL_KM } from 'services';

import styles from '../index.module.scss';

interface PersonRunBarProps {
  hideDrawer?: boolean;
  onUserClick?: (id: string) => void;
}

const PersonRunBar: React.FC<PersonRunBarProps> = ({ onUserClick, hideDrawer }) => {

  const history = useHistory()

  const [visible, setVisible] = useState(false)

  const [toastVisible, setToastVisible] = useState(false)
  const [followVisible, setFollowVisible] = useState(false)

  return (
    <div className={styles.toolbar}>
      <div className={styles.line}>
        <div className={styles.detail} onClick={() => setVisible(true)} >
          <img src={logo} alt="logo" />
          <div>全程 {TOTAL_KM} 公里</div>
        </div>
        <div>
          {toastVisible && <div className={styles.toast}>
            <img className={styles.foot} src={foot} alt="" />
            <span className={styles.text}>收起手机，走一走</span>
          </div>}
          <div className={styles.startBtn} onClick={() => setToastVisible(!toastVisible)}>GO</div>
        </div>
        <div className={styles.right}>
          <div onClick={() => history.push("/introduction/person")}>比赛规则 {'>'}</div>
          <div className={styles.followBtn} onClick={() => setFollowVisible(true)} >我的关注</div>
        </div>
      </div>
      <ProgressPanel destroyOnClose visible={!hideDrawer && visible} onClose={() => setVisible(false)} />
      <SNSPanel destroyOnClose height="60vh" visible={!hideDrawer && followVisible} onClose={() => setFollowVisible(false)} onUserClick={onUserClick} />
    </div>
  )

}

export default PersonRunBar;
