import { Spin } from 'antd';
import React from 'react';
import { useMutation } from 'react-query';
import { followSomeone, removeFollow } from 'services';
import FavOutlineIcon from 'assets/images/fav_outline_icon.png';

import Button, { ButtonSizeType } from 'components/Base/Button';

import Toast from 'light-toast';

interface FollowButtonProps {
    userId: string;
    followId?: string;
    follow: boolean;
    size?: keyof ButtonSizeType;
    border?: boolean;
    onChange?: () => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({ follow, followId, userId, size, border, onChange }) => {

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
        if (follow) {
            console.log("unFollow", followId)
            followId && unFollowMutation.mutateAsync(followId)
        } else {
            console.log("follow")
            userId && followMutation.mutateAsync(userId)
        }
    }

    return (
        <Button
            loading={followMutation.isLoading || unFollowMutation.isLoading}
            icon={!follow?<img src={FavOutlineIcon} alt='fav' width="13px" height="11px" />:null}
            size={size}
            border={border}
            onClick={handleOnClick}
            theme={follow ? "default" : "success"}
        >{follow ? "取消关注" : "关注"}</Button>
    )

}

export default FollowButton;