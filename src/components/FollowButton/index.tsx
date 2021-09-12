import React from 'react';
import { useMutation } from 'react-query';
import { followSomeone, removeFollow } from '../../services';

import Button from '../Button';

interface FollowButtonProps {
    userId: string;
    followId?: string;
    follow: boolean;
    onChange?: () => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({ follow, followId, userId, onChange }) => {

    const followMutation = useMutation(followSomeone, {
        onSuccess: () => onChange?.()
    })
    const unFollowMutation = useMutation(removeFollow, {
        onSuccess: () => onChange?.()
    })

    const handleOnClick = () => {
        if(follow) {
            followId && unFollowMutation.mutateAsync(followId)
        } else {
            userId && followMutation.mutateAsync(userId)
        }
    }

    return (
        <Button onClick={handleOnClick} theme={follow?"default":"success"}>{follow?"取消关注":"关注"}</Button>
    )

}

export default FollowButton;