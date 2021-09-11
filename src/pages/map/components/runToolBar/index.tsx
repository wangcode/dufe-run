import React, { useState } from 'react';

import LogoPNG from '../../../../assets/images/logo.png';
import DrawerPanel from '../../../../components/DrawerPanel';
import SNSPanel from '../../../../components/SNSPanel';
import ProgressPanel from '../progressPanel';

import styles from './index.module.scss';


const RunToolBar = () => {

    const [ visible, setVisible ] = useState(false)

    const [ toastVisible, setToastVisible ] = useState(false)
    const [ followVisible, setFollowVisible ] = useState(false)

    const total = 20

    return (
        <div className={styles.toolbar}>
            <div className={styles.line}>
                <div className={styles.detail} onClick={() => setVisible(true)}>
                    <img src={LogoPNG} alt="logo" />
                    <div>全程 {total} 公里</div>
                </div>
                <div>
                    {toastVisible && <div className={styles.toast}>收起手机，走一走</div>}
                    <div className={styles.startBtn} onClick={() => setToastVisible(true)}>GO</div>
                </div>
                <div className={styles.followBtn} onClick={() => setFollowVisible(true)} >我的关注</div>
            </div>
            <DrawerPanel visible={visible} onClose={() => setVisible(false)}>
                <ProgressPanel />
            </DrawerPanel>
            {/* <DrawerPanel destroyOnClose height="35vh" visible={followVisible} onClose={() => setFollowVisible(false)}> */}
                <SNSPanel />
            {/* </DrawerPanel> */}
        </div>
    )

}

export default RunToolBar;