import { HeartOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React from 'react';

import styles from './index.module.scss';

export const RankUser = () => {

    return (
        <div className={styles.userItem}>
            <div className={styles.user}>
                <div className={styles.rank}>1</div>
                <div className={styles.avatar}>萧</div>
                <div className={styles.name}>马萧萧</div>
            </div>
            <div className={styles.extra}>
                <div className={styles.steps}>16888</div>
                <div className={styles.fav}>
                    <div>30</div>
                    <div><HeartOutlined /></div>
                </div>
            </div>
        </div>
    )

}


const Rank = () => {
    return (
        <div>

            <div>
                <div>今日排行榜</div>
            </div>

            <div>
                <RankUser />
                <RankUser />
                <RankUser />
                <RankUser />
            </div>

        </div>
    )
}

export default Rank;