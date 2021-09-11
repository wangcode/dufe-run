import { HeartOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React from 'react';
import UserLine from '../../components/UserLine';

import styles from './index.module.scss';

const Rank = () => {
    return (
        <div>

            <div>
                <div>今日排行榜</div>
            </div>

            <div>
                <UserLine />
                <UserLine />
                <UserLine />
                <UserLine />
            </div>

        </div>
    )
}

export default Rank;