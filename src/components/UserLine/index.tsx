import { HeartOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { removeStepUp, StepUpSomeOne } from '../../services';
import Avatar from '../Avatar';
import Button from '../Button';
import DrawerPanel from '../DrawerPanel';
import UserPanel from './components/userPanel';

import styles from './index.module.scss';

interface UserLineProps {
    userId?: string;
    name: string;
    pic: string;
    rank: number;
    steps: number;
    like?: boolean;
    likeNum?: number;
    follow?: boolean;
    medal?: boolean;
    onFollowClick?: () => void;
}

const UserLine: React.FC<UserLineProps> = ({ userId, name, pic, rank, medal, steps, like, likeNum, follow, onFollowClick }) => {

    const [ visible, setVisible ] = useState(false)

    const { mutate: stepUp } = useMutation(StepUpSomeOne)
    const { mutate: unStepUp } = useMutation(removeStepUp)

    const handleOnLike = () => {
        if(!userId) return;
        if(like) {
            unStepUp(userId)
        } else {
            stepUp(userId)
        }
    }

    return (
        <div className={styles.userItem}>
            <div className={styles.user} onClick={() => setVisible(true)}>
                <div className={styles.rank}>
                    {medal && rank===1 && <div className={styles.gold} />}
                    {medal && rank===2 && <div className={styles.silver} />}
                    {medal && rank===3 && <div className={styles.bronze} />}
                    {medal && rank > 3 && rank}
                    {!medal && rank}
                </div>
                <div className={styles.avatar}>
                    <Avatar src={pic} />
                </div>
                <div className={styles.name}>{name}</div>
            </div>
            <div className={styles.extra}>
                {steps!==undefined && <div className={styles.steps}>{steps} 步</div>}
                <div className={styles.fav} onClick={handleOnLike}>
                    {likeNum!==undefined && <div>{likeNum}</div>}
                    {like && <div className={styles.like} />}
                    {!like && <div className={styles.unlike} />}
                </div>
                {onFollowClick && <Button size="small" theme={follow?"default":"success"}>{follow?"取消关注":"关注"}</Button>}
            </div>
            <DrawerPanel visible={visible} onClose={() => setVisible(false)} destroyOnClose>
                <UserPanel name={name} pic={pic} steps={steps} />
            </DrawerPanel>
        </div>
    )
}

export default UserLine;