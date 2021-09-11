import { HeartOutlined, RightOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import UserLine from '../../components/UserLine';
import { getMySteps, getNowRank } from '../../services';

import styles from './index.module.scss';

interface RankListProps {
    title?: boolean;
    medal?: boolean;
}

export const RankList: React.FC<RankListProps> = ({ title, medal }) => {

    const history = useHistory()

    const { data } = useQuery("ranks", getNowRank)

    return (
        <div className={styles.rankPanel}>
            {title && <div className={styles.rankButton} onClick={() => history.push("/rank")}>
                <span>今日排行榜</span>
                <RightOutlined />
            </div>}
            <div className={styles.rankPanelContent}>
                {data?.map((rank, index) => (
                    <div key={rank.userId} className={styles.rankItem}>
                        <UserLine
                            userId={rank.userId}
                            rank={index+1}
                            medal={medal}
                            name={rank.name}
                            avatar={rank.pic}
                            like={rank.goodFlag==="1"}
                            steps={parseInt(rank.rowStep)}
                            likeNum={rank.goodNum}
                        />
                    </div>
                ))}
                {/* <div className={styles.rankItem}>
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
                </div> */}
            </div>
        </div>
    )
}

const Rank = () => {

    const { data } = useQuery("mySteps", getMySteps)

    return (
        <div>
            {data && <div className={styles.self}>
                <UserLine like medal
                    rank={data.allRank}
                    name={data?.name}
                    avatar={data?.pic}
                    likeNum={data?.goodNum}
                />
            </div>}

            <RankList />

        </div>
    )
}

export default Rank;