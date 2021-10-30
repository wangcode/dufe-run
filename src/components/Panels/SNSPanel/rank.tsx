import React from 'react';
import { Empty, Spin } from 'antd';
import { useQuery } from 'react-query';
import { getNowRank } from 'services';

import UserLine from 'components/LineItem/UserLine';
import styles from './index.module.scss';

interface RankListProps {
  onClick?: (id: string) => void;
}

const RankList: React.FC<RankListProps> = ({ onClick }) => {

  const { data, isLoading, isFetching, refetch } = useQuery("rank", getNowRank)

  return (
    <Spin spinning={isLoading || isFetching}>
      <div className={styles.searchList}>
        {data?.map((rank, index) => (
          <div key={rank.userId} className={styles.searchItem}>
            <UserLine
              userId={rank.userId}
              rank={index + 1}
              medal
              name={rank.name}
              pic={rank.pic}
              like={{
                likeId: rank.goodId,
                likeNum: rank.goodNum.toString(),
                isLike: rank.goodFlag === "1",
                onChange: refetch
              }}
              onUserClick={() => onClick?.(rank.userId)}
              steps={rank.nowStep || "0"}
            />
          </div>
        ))}

        {data?.length === 0 && <div className={styles.empty}>
          <Empty description="暂无排行！" />
        </div>}
      </div>
    </Spin>
  )

}

export default RankList;
