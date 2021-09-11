import { HeartOutlined, RightOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';
import UserLine from '../../components/UserLine';

import styles from './index.module.scss';

interface RankListProps {
    title?: boolean;
    medal?: boolean;
}

export const RankList: React.FC<RankListProps> = ({ title, medal }) => {

    const history = useHistory()

    return (
        <div className={styles.rankPanel}>
            {title && <div className={styles.rankButton} onClick={() => history.push("/rank")}>
                <span>今日排行榜</span>
                <RightOutlined />
            </div>}
            <div className={styles.rankPanelContent}>
                <div className={styles.rankItem}>
                    <UserLine
                        rank={1}
                        medal={medal}
                        name="孟浩"
                        avatar=""
                        like
                        steps={111}
                        likeNum={29}
                    />
                </div>
                <div className={styles.rankItem}>
                    <UserLine
                        rank={2}
                        medal={medal}
                        name="孟浩"
                        avatar=""
                        like
                        steps={111}
                        likeNum={29}
                    />
                </div>
                <div className={styles.rankItem}>
                    <UserLine
                        rank={3}
                        medal={medal}
                        name="孟浩"
                        avatar=""
                        like
                        steps={111}
                        likeNum={29}
                    />
                </div>
            </div>
        </div>
    )
}

const Rank = () => {
    return (
        <div>
            <div className={styles.self}>
                <UserLine
                    rank={3}
                    medal
                    name="孟浩"
                    avatar=""
                    like
                    likeNum={29}
                />
            </div>

            <RankList />

        </div>
    )
}

export default Rank;