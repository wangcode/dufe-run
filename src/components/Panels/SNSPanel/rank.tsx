import React from 'react';
import { Empty, Spin } from 'antd';
import { useQuery } from 'react-query';
import { getNowRank } from 'services';

import UserLine from 'components/UserLine';
import styles from './index.module.scss';

interface RankListProps {
  onClick?: () => void;
}

const RankList: React.FC<RankListProps> = ({ onClick }) => {

  const { data, isLoading, isFetching } = useQuery("rank", getNowRank)

  return (
    <Spin spinning={isLoading || isFetching}>
      <div className={styles.searchList}>
        {data?.map((item, index) => (
          <div key={item.userId} className={styles.searchItem}>
            <UserLine
              rank={index + 1}
              name={item.name}
              pic={item.pic}
              // length={transStep2Kilometer(item.allStep)}
              userId={item.userId}
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
