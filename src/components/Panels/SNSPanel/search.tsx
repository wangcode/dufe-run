import React from 'react';

import { Empty, Space, Spin } from 'antd';

import Avatar from 'components/Base/Avatar';
import FollowButton from 'components/FollowButton';
import { JoinFlag } from 'services';
import { transStep2Kilometer } from 'utils';

import styles from './index.module.scss';
export interface SearchUserPorps {
  pic: string;
  name: string;
  joinFlag: JoinFlag;
  followFlag: "0" | "1";
  allStep: string;
  userId: string;
  allRank: string;
  followId: string;
  onChange: () => void;
}

const SearchUser: React.FC<SearchUserPorps> = ({ pic, name, joinFlag, followFlag, userId, followId, allStep, allRank, onChange }) => {
  return (
    <div className={styles.searchUser}>
      <div className={styles.userDetail}>
        <div className={styles.avatar}><Avatar src={pic} text={name} /></div>
        <Space direction="vertical">
          <div className={styles.left}>
            <div className={styles.name}>{name}</div>
            <span>{joinFlag === JoinFlag.join ? `${transStep2Kilometer(allStep)}km` : "未参加"}</span>
          </div>
          {/* <div className={styles.name}>孟浩 <span>未注册|未参加|3.5KM</span></div> */}
          <div className={styles.edu}>
            {joinFlag === JoinFlag.join && `第${allRank}名`}
            {joinFlag === JoinFlag.unJoin && "-"}
            {/* <Space>
                            <span>1998年入学</span>
                            <span>会计学院</span>
                        </Space> */}
          </div>
        </Space>
      </div>
      {joinFlag === JoinFlag.join && <FollowButton onChange={onChange} followId={followId} follow={followFlag === "1"} userId={userId} />}
    </div>
  )
}


interface SearchProps {
  searchKey: string;
  loading: boolean;
  users: Omit<SearchUserPorps, "onChange">[];
  reSearch: () => void;
}

const Search: React.FC<SearchProps> = ({ searchKey, loading, users, reSearch }) => {

  return (
    <Spin spinning={loading}>
      <div className={styles.searchList}>
        {users.map(item => (
          <div key={item.userId} className={styles.searchItem}>
            <SearchUser {...item} onChange={reSearch} />
          </div>
        ))}
        {users?.length === 0 && searchKey && !loading && <div className={styles.empty}>
          <Empty description={`未查询到 “${searchKey}”`} />
        </div>}
      </div>
    </Spin>
  )

}

export default Search;
