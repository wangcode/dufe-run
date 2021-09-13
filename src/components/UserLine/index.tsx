import { HeartOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { removeStepUp, StepUpSomeOne } from '../../services';
import Avatar from '../Avatar';
import Button from '../Button';
import DrawerPanel from '../DrawerPanel';
import FollowButton from '../FollowButton';
import UserPanel from './components/userPanel';

import styles from './index.module.scss';

interface UserLineProps {
    userId: string;
    name: string;
    pic: string;
    rank: number;
    steps: string;
    like?: {
        likeNum: string;
        isLike: boolean;
        disabled?: boolean;
        onChange?: () => void;
    }
    follow?: {
        followId: string;
        isFollow: boolean;
        onChange?: () => void;
    }
    medal?: boolean;
    onFollowClick?: () => void;
}

const UserLine: React.FC<UserLineProps> = ({ userId, name, pic, rank, medal, steps, like, follow }) => {

    const [ visible, setVisible ] = useState(false)

    const { mutate } = useMutation(() => like?.isLike?removeStepUp(userId):StepUpSomeOne(userId), {
        onSuccess: like?.onChange
    })

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
                {like && <div className={styles.fav} onClick={() => !like?.disabled && mutate()}>
                    {like.likeNum!==undefined && <div>{like.likeNum}</div>}
                    {like?.isLike && <div className={styles.like} />}
                    {!like?.isLike && <div className={styles.unlike} />}
                </div>}
                {follow && <FollowButton followId={follow.followId} follow={follow.isFollow} userId={userId} onChange={follow.onChange} />}
            </div>
            <DrawerPanel visible={visible} onClose={() => setVisible(false)} destroyOnClose>
                <UserPanel userId={userId} name={name} pic={pic} steps={steps} allSteps="11" />
            </DrawerPanel>
        </div>
    )
}

export default UserLine;