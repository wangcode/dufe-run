import { HeartOutlined } from '@ant-design/icons';
import React from 'react';
import Avatar from '../Avatar';
import Button from '../Button';

import styles from './index.module.scss';

interface UserLineProps {
    userId?: string;
    name: string;
    avatar: string;
    rank: number;
    steps?: number;
    like?: boolean;
    likeNum?: number;
    follow?: boolean;
    medal?: boolean;
    onFollowClick?: () => void;
}

const UserLine: React.FC<UserLineProps> = ({ userId, name, avatar, rank, medal, steps, like, likeNum, follow, onFollowClick }) => {

    return (
        <div className={styles.userItem}>
            <div className={styles.user}>
                <div className={styles.rank}>
                    {medal && rank===1 && <div className={styles.gold} />}
                    {medal && rank===2 && <div className={styles.silver} />}
                    {medal && rank===3 && <div className={styles.bronze} />}
                    {medal && rank > 3 && rank}
                    {!medal && rank}
                </div>
                <div className={styles.avatar}>
                    <Avatar src={avatar} />
                </div>
                <div className={styles.name}>{name}</div>
            </div>
            <div className={styles.extra}>
                {steps!==undefined && <div className={styles.steps}>{steps}</div>}
                <div className={styles.fav}>
                    {likeNum!==undefined && <div>{likeNum}</div>}
                    {like!==undefined && <div>
                        {like && <div className={styles.like} />}
                        {!like && <div className={styles.unlike} />}
                    </div>}
                </div>
                {onFollowClick && <Button size="small" theme={follow?"default":"success"}>{follow?"取消关注":"关注"}</Button>}
            </div>
        </div>
    )
}

export default UserLine;