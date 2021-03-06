import React from 'react';
import { message } from 'antd';
import { useMutation } from 'react-query';
import { followSomeone, followStepTeam, followStepTeamPerson, removeFollow, removeFollowStepTeam } from 'services';

import Button, { ButtonSizeType } from 'components/Base/Button';

import FavOutlineIcon from 'assets/images/fav_outline_icon.png';
import FavIcon from 'assets/images/fav_map_circle_icon.png';

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
      message.success("关注成功！")
      onChange?.()
    }
  })
  const unFollowMutation = useMutation(removeFollow, {
    onSuccess: () => {
      message.success("取消关注成功！")
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
  followId?: number;
  follow: boolean;
  size?: keyof ButtonSizeType;
  border?: boolean;
  onChange?: () => void;
}

// 关注战队
export const FollowTeamButton: React.FC<FollowTeamButtonProps> = ({ follow, followId, teamId, size, border, onChange }) => {

  const followMutation = useMutation(followStepTeam, {
    onSuccess: () => {
      message.success("关注成功！")
      onChange?.()
    }
  })
  const unFollowMutation = useMutation(removeFollowStepTeam, {
    onSuccess: () => {
      message.success("取消关注成功！")
      onChange?.()
    }
  })

  const handleOnClick = () => {
    if (follow) {
      followId && unFollowMutation.mutateAsync(followId.toString())
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


interface FollowTeamOrUserButtonProps {
  id: string;
  followId?: number;
  follow: boolean;
  size?: keyof ButtonSizeType;
  border?: boolean;
  mapBtn?: boolean;
  type: "team" | "person";
  onChange?: () => void;
}

// 关注战队/战队用户
export const FollowTeamOrUserButton: React.FC<FollowTeamOrUserButtonProps> = ({ mapBtn = true, follow, followId, id, size, border, type = "person", onChange }) => {

  const teamFollowMutation = useMutation(followStepTeam, {
    onSuccess: () => {
      message.success("关注成功！")
      onChange?.()
    }
  })

  const userFollowMutation = useMutation(followStepTeamPerson, {
    onSuccess: () => {
      message.success("关注成功！")
      onChange?.()
    }
  })

  const unFollowMutation = useMutation(removeFollowStepTeam, {
    onSuccess: () => {
      message.success("取消关注成功！")
      onChange?.()
    }
  })

  const handleOnClick = () => {
    if (follow) {
      followId && unFollowMutation.mutateAsync(followId.toString())
    } else {
      if (!id) return;
      type === "person" && userFollowMutation.mutateAsync(id)
      type === "team" && teamFollowMutation.mutateAsync(id)
    }
  }

  if (!follow && mapBtn) return <div style={{ width: "74px", textAlign: "center" }}><img onClick={handleOnClick} src={FavIcon} alt="FavBtn" /></div>

  return (
    <Button
      loading={userFollowMutation.isLoading || teamFollowMutation.isLoading || unFollowMutation.isLoading}
      icon={!follow ? <img src={FavOutlineIcon} alt='fav' width="13px" height="11px" /> : null}
      size={size}
      border={border}
      onClick={handleOnClick}
      theme={follow ? "default" : "success"}
    >{follow ? "取消关注" : "关注"}</Button>
  )
}
