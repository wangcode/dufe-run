import React from 'react';
import { Empty, Spin } from 'antd';
import { useQuery } from 'react-query';
import { getMyFollowList } from 'services';

import UserLine from 'components/UserLine';
import Button from 'components/Base/Button';
import { transStep2Kilometer } from 'utils';
import styles from './index.module.scss';

interface MyFollowPersonProps {
  onClick?: () => void;
}

const MyFollowPerson: React.FC<MyFollowPersonProps> = ({ onClick }) => {

  const { data, refetch, isLoading, isFetching } = useQuery("follows", getMyFollowList)

  return (
    <Spin spinning={isLoading || isFetching}>
      <div className={styles.searchList}>
        {data?.map((item, index) => (
          <div key={item.userId} className={styles.searchItem}>
            <UserLine
              rank={index + 1}
              name={item.name}
              pic={item.pic}
              length={transStep2Kilometer(item.allStep)}
              userId={item.userId}
              follow={{
                followId: item.followId,
                isFollow: true,
                onChange: refetch,
                buttonSize: "small"
              }}
            />
          </div>
        ))}

        {data?.length === 0 && <div className={styles.empty}>
          <Empty description="暂无关注好友！" />
          {onClick && <Button theme="success" onClick={onClick}>去关注</Button>}
        </div>}
      </div>
    </Spin>
  )

}

export default MyFollowPerson;
