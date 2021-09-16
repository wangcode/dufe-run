import { Spin } from 'antd';
import React from 'react';
import { useMutation } from 'react-query';
import { followSomeone, removeFollow } from '../../services';

import Button, { ButtonSizeType } from '../Button';

import Toast from 'light-toast';

interface FollowButtonProps {
    userId: string;
    followId?: string;
    follow: boolean;
    size?: keyof ButtonSizeType;
    onChange?: () => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({ follow, followId, userId, size, onChange }) => {

    const followMutation = useMutation(followSomeone, {
        onSuccess: () => {
            Toast.info("关注成功！")
            onChange?.()
        }
    })
    const unFollowMutation = useMutation(removeFollow, {
        onSuccess: () => {
            Toast.info("取消关注成功！")
            onChange?.()
        }
    })

    const handleOnClick = () => {
        if(follow) {
            console.log("unFollow", followId)
            followId && unFollowMutation.mutateAsync(followId)
        } else {
            console.log("follow")
            userId && followMutation.mutateAsync(userId)
        }
    }

    return (
        <Spin spinning={followMutation.isLoading||unFollowMutation.isLoading}>
            <Button size={size} onClick={handleOnClick} theme={follow?"default":"success"}>{follow?"取消关注":"关注"}</Button>
        </Spin>
    )

}

export default FollowButton;