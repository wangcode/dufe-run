import React from 'react';
import { useMutation } from 'react-query';
import { followSomeone, followStepTeam, followStepTeamPerson, removeFollow, removeFollowStepTeam } from 'services';
import FavOutlineIcon from 'assets/images/fav_outline_icon.png';
import FavIcon from 'assets/images/fav_map_circle_icon.png';

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

// 关注用户
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
      followId && unFollowMutation.mutateAsync(followId)
    } else {
      userId && followMutation.mutateAsync(userId)
    }
  }

  return (
    <Button
      loading={followMutation.isLoading || unFollowMutation.isLoading}
      icon={!follow ? <img src={FavOutlineIcon} alt='fav' width="13px" height="11px" /> : null}
      size={size}
      border={border}
      onClick={handleOnClick}
      theme={follow ? "default" : "success"}
    >{follow ? "取消关注" : "关注"}</Button>
  )

}

export default FollowButton;


interface FollowTeamButtonProps {
  teamId: string;
  followId?: string;
  follow: boolean;
  size?: keyof ButtonSizeType;
  border?: boolean;
  onChange?: () => void;
}

// 关注战队
export const FollowTeamButton: React.FC<FollowTeamButtonProps> = ({ follow, followId, teamId, size, border, onChange }) => {

  const followMutation = useMutation(followStepTeam, {
    onSuccess: () => {
      Toast.info("关注成功！")
      onChange?.()
    }
  })
  const unFollowMutation = useMutation(removeFollowStepTeam, {
    onSuccess: () => {
      Toast.info("取消关注成功！")
      onChange?.()
    }
  })

  const handleOnClick = () => {
    if (follow) {
      followId && unFollowMutation.mutateAsync(followId)
    } else {
      teamId && followMutation.mutateAsync(teamId)
    }
  }

  return (
    <Button
      loading={followMutation.isLoading || unFollowMutation.isLoading}
      icon={!follow ? <img src={FavOutlineIcon} alt='fav' width="13px" height="11px" /> : null}
      size={size}
      border={border}
      onClick={handleOnClick}
      theme={follow ? "default" : "success"}
    >{follow ? "取消关注" : "关注"}</Button>
  )
}


interface FollowTeamUserButtonProps {
  userId: string;
  followId?: string;
  follow: boolean;
  size?: keyof ButtonSizeType;
  border?: boolean;
  onChange?: () => void;
}

// 关注战队用户
export const FollowTeamUserButton: React.FC<FollowTeamUserButtonProps> = ({ follow, followId, userId, size, border, onChange }) => {

  const followMutation = useMutation(followStepTeamPerson, {
    onSuccess: () => {
      Toast.info("关注成功！")
      onChange?.()
    }
  })
  const unFollowMutation = useMutation(removeFollowStepTeam, {
    onSuccess: () => {
      Toast.info("取消关注成功！")
      onChange?.()
    }
  })

  const handleOnClick = () => {
    if (follow) {
      followId && unFollowMutation.mutateAsync(followId)
    } else {
      userId && followMutation.mutateAsync(userId)
    }
  }

  if (!follow) return <img onClick={handleOnClick} src={FavIcon} alt="FavBtn" />

  return (
    <Button
      loading={followMutation.isLoading || unFollowMutation.isLoading}
      icon={!follow ? <img src={FavOutlineIcon} alt='fav' width="13px" height="11px" /> : null}
      size={size}
      border={border}
      onClick={handleOnClick}
      theme={follow ? "default" : "success"}
    >{follow ? "取消关注" : "关注"}</Button>
  )
}
