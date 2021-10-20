import React, { useState } from 'react';

import logo from 'assets/images/logo_btn.png';
import DrawerPanel from 'components/Base/DrawerPanel';
import SNSPanel from 'components/Panels/SNSPanel';
import ProgressPanel from '../progressPanel';

import styles from './index.module.scss';
import foot from 'assets/images/foot_icon.png';

interface RunToolBarProps {
    mode?: "person" | "team"
}

const RunToolBar: React.FC<RunToolBarProps> = ({ mode = "person" }) => {

    const [visible, setVisible] = useState(false)

    const [toastVisible, setToastVisible] = useState(false)
    const [followVisible, setFollowVisible] = useState(false)

    return (
        <div className={styles.toolbar}>
            {mode === "person" && <div className={styles.line}>
                <div className={styles.detail}>
                    <img src={logo} alt="logo" onClick={() => setVisible(true)} />
                    {/* <div>全程 {TOTAL_LENGTH / 1000} 公里</div> */}
                    <div className={styles.followBtn} onClick={() => setFollowVisible(true)} >我的关注</div>
                </div>
                <div>
                    {toastVisible && <div className={styles.toast}>
                        <img className={styles.foot} src={foot} />
                        <span className={styles.text}>收起手机，走一走</span>
                    </div>}
                    <div className={styles.startBtn} onClick={() => setToastVisible(true)}>GO</div>
                </div>
                <div className={styles.right}>
                    <div>比赛规则 {'>'}</div>
                    <div className={styles.followBtn} onClick={() => setFollowVisible(true)} >道具记录</div>
                </div>
            </div>}
            {mode === "team" && <div className={styles.line}>
                <div className={styles.detail}>
                    <img src={logo} alt="logo" onClick={() => setVisible(true)} />
                    <div className={styles.followBtn} onClick={() => setFollowVisible(true)} >战队信息</div>
                </div>
                <div>
                    {toastVisible && <div className={styles.toast}>
                        <img className={styles.foot} src={foot} />
                        <span className={styles.text}>收起手机，走一走</span>
                    </div>}
                    <div className={styles.startBtn} onClick={() => setToastVisible(true)}>GO</div>
                </div>
                <div className={styles.right}>
                    <div>比赛规则 {'>'}</div>
                    <div className={styles.followBtn} onClick={() => setFollowVisible(true)} >道具记录</div>
                </div>
            </div>}
            <DrawerPanel destroyOnClose visible={visible} onClose={() => setVisible(false)}>
                <ProgressPanel />
            </DrawerPanel>
            <SNSPanel destroyOnClose height="55vh" visible={followVisible} onClose={() => setFollowVisible(false)} />
        </div>
    )

}

export default RunToolBar;