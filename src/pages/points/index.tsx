import React from 'react';
import Button from '../../components/Button';

import walk from '../../assets/images/walk.png';

import styles from './index.module.scss';
import { TOTAL_LENGTH } from '../../services';

const Point = () => {

    return (
        <div className={styles.main}>
            <div className={styles.points}>当前积分：<span>100</span>积分</div>
            <div className={styles.total}>
                <div>今日行程：<span>1.1KM</span></div>
                <div>累计行程：<span>12KM</span></div>
                <div>全程：<span> {TOTAL_LENGTH / 1000}KM</span></div>
            </div>
            <div className={styles.missionPanel}>
                <div className={styles.mission}>
                    <div className={styles.detail}>
                        <img src={walk} className={styles.walk} />
                        <div>累计行程达到 <span>1KM</span></div>
                    </div>
                    <Button theme="hot" >
                        <div className={styles.missionButton}>
                            <div className={styles.coin} />
                            <span>领取5积分</span>
                        </div>
                    </Button>
                </div>

                <div className={styles.mission}>
                    <div className={styles.detail}>
                        <img src={walk} className={styles.walk} />
                        <div>累计行程达到 <span>1KM</span></div>
                    </div>
                    <div>
                        <Button disabled theme="hot">已领取2积分</Button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Point;