import React, { useMemo } from 'react';
import { Divider, Progress, Spin } from 'antd';
import styles from './index.module.scss';
import { getMySteps, TOTAL_LENGTH } from '../../../../services';
import { useQuery } from 'react-query';
import { transStep2Kilometer } from '../../../../utils';

const ProgressPanel = () => {

    const { data, isLoading } = useQuery("mySteps", getMySteps)

    const TotalKM = TOTAL_LENGTH / 1000

    const LengthKM = transStep2Kilometer(data?.allStep)

    const points = 50

    const treasureChest = 5

    const percent = useMemo(() => {
        return LengthKM / TotalKM
    }, [LengthKM, TotalKM])

    return (
        <div>
            <Spin spinning={isLoading} >
                <div className={styles.rule}>
                    <div>可获得 <span>{points} 积分</span>，<span>{treasureChest} 个宝箱</span>。</div>
                    <div>同行好友越多，到达终点奖励越丰厚</div>
                </div>
                <Divider />
                <div className={styles.progress}>
                    <div className={styles.total}>全程：<strong>{TotalKM}<em>KM</em></strong></div>
                    <div className={styles.surplus}>还差 {TotalKM - LengthKM}km 到达终点</div>
                </div>
                <Progress strokeColor={{from: "#c216fb", to: "#1244A8"}} percent={percent*100} showInfo={false} />
            </Spin>
        </div>
    )
}

export default ProgressPanel;