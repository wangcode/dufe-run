import React from 'react';

import UserLine from '../UserLine';
import { useQuery } from 'react-query';
import { getMyFollowList } from '../../services';

import styles from './index.module.scss';


const Rank = () => {

    const { data } = useQuery("follows", getMyFollowList)

    return (
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
        </div>
    )

}

export default Rank;