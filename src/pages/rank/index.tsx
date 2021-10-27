import { RightOutlined } from '@ant-design/icons';
import { Empty, Spin } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import UserLine from 'components/UserLine';
import { getMySteps, getNowRank, GoodFlag } from 'services';

import styles from './index.module.scss';
import classNames from 'classnames';

interface RankListProps {
  title?: boolean;
  medal?: boolean;
  box?: boolean;
}

export const RankList: React.FC<RankListProps> = ({ title, medal, box = true }) => {

  const history = useHistory()

  const { data, refetch, isLoading } = useQuery("ranks", getNowRank)

  return (
    <div className={classNames({ [styles.rankPanel]: box })}>
      {title && <div className={styles.rankButton} onClick={() => history.push("/rank")}>
        <span>今日排行榜</span>
        <RightOutlined />
      </div>}
      <Spin spinning={isLoading}>
        <div className={styles.rankPanelContent}>
          {data?.map((rank, index) => (
            <div key={rank.userId} className={styles.rankItem}>
              <UserLine
                userId={rank.userId}
                rank={index + 1}
                medal={medal}
                name={rank.name}
                pic={rank.pic}
                like={{
                  likeId: rank.goodId,
                  likeNum: rank.goodNum.toString(),
                  isLike: rank.goodFlag === GoodFlag.good,
                  onChange: refetch
                }}
                steps={rank.nowStep}
              />
            </div>
          ))}
        </div>
      </Spin>
      {data?.length === 0 && <div className={styles.empty}>
        <Empty description="暂无排行，你是第一位哟~" />
      </div>}
    </div>
  )
}

const Rank = () => {

  const { data } = useQuery("mySteps", getMySteps)

  return (
    <div>
      {data && <div className={styles.self}>
        <UserLine
          medal
          userPanel={false}
          userId={data?.userId}
          like={{
            likeNum: data?.goodNum.toString(),
            isLike: true,
            disabled: true,
            likeId: ""
          }}
          steps={data.allStep}
          rank={data.allRank}
          name={data.name}
          pic={data.pic}
        />
      </div>}

      <RankList medal />

    </div>
  )
}

export default Rank;
