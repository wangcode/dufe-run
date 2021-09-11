import React, { useMemo } from 'react';
import { Divider, Progress } from 'antd';
import styles from './index.module.scss';

const ProgressPanel = () => {

    const points = 50

    const treasureChest = 5

    const total = 20

    const distance = 18.3

    const percent = useMemo(() => {
        return 1 - distance / total
    }, [distance, total])

    return (
        <div>
            <div className={styles.rule}>
                <div>可获得 <span>{points} 积分</span>，<span>{treasureChest} 个宝箱</span>。</div>
                <div>同行好友越多，到达终点奖励越丰厚</div>
            </div>
            <Divider /> 
            <div className={styles.progress}>
                <div className={styles.total}>全程：<strong>{total}<em>KM</em></strong></div>
                <div className={styles.surplus}>还差 {distance}km 到达终点</div>
            </div>
            <Progress strokeColor={{from: "#c216fb", to: "#1244A8"}} percent={percent*100} showInfo={false} />
        </div> 
    )
}

export default ProgressPanel;