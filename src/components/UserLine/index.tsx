import { HeartOutlined } from '@ant-design/icons';
import React from 'react';
import Avatar from '../Avatar';
import Button from '../Button';

import styles from './index.module.scss';

interface UserLineProps {
    name: string;
    avatar: string;
    rank: number;
    steps?: number;
    like?: boolean;
    likeNum?: number;
    follow?: boolean;
}

const UserLine: React.FC<UserLineProps> = ({ name, avatar, rank, steps, like, likeNum, follow }) => {
    return (
        <div className={styles.userItem}>
            <div className={styles.user}>
                <div className={styles.rank}>{rank}</div>
                <div className={styles.avatar}>
                    <Avatar src={avatar} />
                </div>
                <div className={styles.name}>{name}</div>
            </div>
            <div className={styles.extra}>
                {steps!==undefined && <div className={styles.steps}>{steps}</div>}
                <div className={styles.fav}>
                    <div>30</div>
                    <div><HeartOutlined /></div>
                </div>
                <Button size="small" theme={follow?"default":"success"}>{follow?"取消关注":"关注"}</Button>
            </div>
        </div>
    )
}

export default UserLine;