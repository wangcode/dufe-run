import React from 'react';

import { Divider, Tabs } from 'antd';

import UserLine from '../UserLine';
import { useQuery } from 'react-query';
import { getMyFollowList } from '../../services';

import styles from './index.module.scss';


const Rank = () => {

    const { data } = useQuery("follows", getMyFollowList)

    return (
        <div>
            {data?.map(item => (
                <UserLine
                    key={item.userId}
                    rank={1}
                    name={item.name}
                    avatar={item.pic}
                />
            ))}
        </div>
    )

}

export default Rank;