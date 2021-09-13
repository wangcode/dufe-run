import React from 'react';
import ContentLoader from 'react-content-loader';
import UserLine from '../UserLine';
import { useQuery } from 'react-query';
import { getMyFollowList } from '../../services';

import styles from './index.module.scss';
import { Empty, Spin } from 'antd';
import Button from '../Button';

interface RankProps {
    onClick?: () => void;
}

const Rank: React.FC<RankProps> = ({ onClick }) => {

    const { data, isLoading, isFetching } = useQuery("follows", getMyFollowList)

    return (
        <Spin spinning={isLoading || isFetching}>
            <div className={styles.searchList}>
                {data?.map(item => (
                    <div className={styles.searchItem}>
                        <UserLine
                            key={item.userId}
                            rank={1}
                            name={item.name}
                            pic={item.pic||""}
                            steps={item.allStep}
                            userId={item.userId}
                            follow={{
                                followId: item.followId,
                                isFollow: true
                            }}
                        />
                    </div>
                ))}

                {data?.length===0 && <div className={styles.empty}>
                    <Empty description="暂无关注好友！" />
                    {onClick && <Button theme="success" onClick={onClick}>去关注</Button>}
                </div>}
            </div>
        </Spin>
    )

}

export default Rank;