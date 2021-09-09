import { Drawer } from 'antd';
import React, { useState } from 'react';

import LogoPNG from '../../../../assets/images/logo.png';

import styles from './index.module.scss';


const RunToolBar = () => {

    const [ visible, setVisible ] = useState(false)

    const handleOnGoClicl = () => {
        setVisible(true)
    }

    return (
        <div className={styles.toolbar}>
            <div className={styles.line}>
                <div className={styles.detail}>
                    <img src={LogoPNG} alt="logo" />
                    <div>全程 20 公里</div>
                </div>
                <div className={styles.followBtn}>我的关注</div>
            </div>
            <div className={styles.position}>
                <div className={styles.startBtn} onClick={handleOnGoClicl}>GO</div>
            </div>
            <Drawer onClose={() => setVisible(false)} visible={visible} placement="bottom">
                123
            </Drawer>
        </div>
    )

}

export default RunToolBar;