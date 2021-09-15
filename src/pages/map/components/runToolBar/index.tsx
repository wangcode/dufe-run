import React, { useState } from 'react';

import LogoPNG from '../../../../assets/images/logo.png';
import DrawerPanel from '../../../../components/DrawerPanel';
import SNSPanel from '../../../../components/SNSPanel';
import ProgressPanel from '../progressPanel';

import styles from './index.module.scss';
import walk from '../../../../assets/images/walk.png';
import { TOTAL_LENGTH } from '../../../../services';


const RunToolBar = () => {

    const [ visible, setVisible ] = useState(false)

    const [ toastVisible, setToastVisible ] = useState(false)
    const [ followVisible, setFollowVisible ] = useState(false)

    return (
        <div className={styles.toolbar}>
            <div className={styles.line}>
                <div className={styles.detail} onClick={() => setVisible(true)}>
                    <img src={LogoPNG} alt="logo" />
                    <div>全程 {TOTAL_LENGTH / 1000} 公里</div>
                </div>
                <div>
                    {toastVisible && <div className={styles.toast}>
                        <img className={styles.walk} src={walk} />
                        <span className={styles.text}>收起手机，走一走</span>
                    </div>}
                    <div className={styles.startBtn} onClick={() => setToastVisible(true)}>GO</div>
                </div>
                <div className={styles.followBtn} onClick={() => setFollowVisible(true)} >我的关注</div>
            </div>
            <DrawerPanel destroyOnClose visible={visible} onClose={() => setVisible(false)}>
                <ProgressPanel />
            </DrawerPanel>
            <SNSPanel destroyOnClose height="55vh" visible={followVisible} onClose={() => setFollowVisible(false)} />
        </div>
    )

}

export default RunToolBar;