import React, { useState } from 'react';
import { useMutation } from 'react-query';

import { removeStepUp, StepUpSomeOne } from 'services';

import Avatar from 'components/Base/Avatar';
import FollowButton from 'components/FollowButton';
import { ButtonSizeType } from 'components/Base/Button';
import UserDetailPanel from 'components/Panels/UserDetailpanel';

import styles from './index.module.scss';

interface UserLineProps {
    userId: string;
    name: string;
    pic: string;
    rank: number;
    like?: {
        likeNum: string;
        isLike: boolean;
        likeId: string;
        disabled?: boolean;
        onChange?: () => void;
    }
    follow?: {
        followId: string;
        isFollow: boolean;
        onChange?: () => void;
        buttonSize?: keyof ButtonSizeType
    }
    userPanel?: boolean;
    medal?: boolean;
    steps?: string; // 步数
    length?: number; // 公里数
    onFollowClick?: () => void;
}

const UserLine: React.FC<UserLineProps> = ({ userId, name, userPanel = true, pic, rank, medal, steps, like, follow, length }) => {

    const [visible, setVisible] = useState(false)

    const { mutate } = useMutation(() => like?.isLike ? removeStepUp(like.likeId) : StepUpSomeOne(userId), {
        onSuccess: like?.onChange
    })

    return (
        <div className={styles.userItem}>
            <div className={styles.user} onClick={() => userPanel && setVisible(true)}>
                <div className={styles.rank}>
                    {medal && rank === 1 && <div className={styles.gold} />}
                    {medal && rank === 2 && <div className={styles.silver} />}
                    {medal && rank === 3 && <div className={styles.bronze} />}
                    {medal && rank > 3 && <div className={styles.medal}>{rank}</div>}
                    {!medal && rank}
                </div>
                <div className={styles.avatar}>
                    <Avatar src={pic} text={name} />
                </div>
                <div className={styles.name}>{name}</div>
            </div>
            <div className={styles.extra}>
                {length !== undefined && <div className={styles.length}>{length} <span>KM</span></div>}
                {steps !== undefined && <div className={styles.steps}>{steps === "-1" ? 0 : steps}</div>}
                {/* todo loading */}
                {like && <div className={styles.fav} onClick={() => !like?.disabled && mutate()}>
                    {like.likeNum !== undefined && <div>{like.likeNum}</div>}
                    {like?.isLike && <div className={styles.like} />}
                    {!like?.isLike && <div className={styles.unlike} />}
                </div>}
                {follow && <FollowButton size={follow.buttonSize} followId={follow.followId} follow={follow.isFollow} userId={userId} onChange={follow.onChange} />}
            </div>
            <UserDetailPanel userId={userId} visible={visible} onClose={() => setVisible(false)} destroyOnClose />
        </div>
    )
}

export default UserLine;