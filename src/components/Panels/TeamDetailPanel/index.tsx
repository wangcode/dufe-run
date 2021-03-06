import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Col, Divider, DrawerProps, message, Modal, Row } from 'antd';
import { useHistory } from 'react-router';

import { FollowTeamButton } from 'components/FollowButton';
import DrawerPanel from 'components/Base/DrawerPanel';
import Button from 'components/Base/Button';
import TeamUserLine from 'components/LineItem/TeamUserLine';

import { getMyStepTeam, getStepTeamPerson, joinStepTeam } from 'services';

import UserIcon from 'assets/images/user_icon.png'
import TeamIcon from 'assets/images/group_icon.png'
import CrownIcon from 'assets/images/crown_outline_icon.png';

import styles from './index.module.scss';
import TeamUsersPanel from '../TeamUsersPanel';

interface TeamDetailPanelProps extends DrawerProps {
  type?: "select" | "show"
  teamId?: string;
  onUserClick?: (userId: string) => void;
}

const TeamDetailPanel: React.FC<TeamDetailPanelProps> = ({ type = "show", teamId, onUserClick, ...props }) => {

  const history = useHistory()

  const [moreVisible, setMoreVisible] = useState(false)

  const { data, isLoading, refetch } = useQuery(["teams", teamId], () => getMyStepTeam(teamId!), { enabled: !!teamId })

  const users = useQuery(["teams", teamId, "users"], () => getStepTeamPerson(teamId!), { enabled: !!teamId })

  const joinTeamMutation = useMutation(joinStepTeam, {
    onSuccess: () => {
      message.success("加入成功！")
      history.replace("/team")
    }
  })

  const handleOnJoinTeam = () => {
    if (!teamId) return

    Modal.confirm({
      content: '确定后不能修改，是否加入该战队？',
      okText: '确定',
      cancelText: '再想想',
      onOk: () => joinTeamMutation.mutateAsync(teamId)
    })
  }

  return (
    <DrawerPanel
      loading={isLoading || users.isLoading}
      bodyStyle={{ paddingLeft: 17, paddingRight: 17 }}
      {...props}
      title={
        <div className={styles.headWrap}>
          <div className={styles.head}>
            <div className={styles.left}>
              <img src={TeamIcon} alt="" />
              <div>{data?.name || "--"}</div>
            </div>
            {type === "select" && <div className={styles.right}>
              <img src={CrownIcon} alt="" />
              <div>第 {data?.allRank || 0} 名</div>
            </div>}
            {type === "show" && data?.id && <FollowTeamButton teamId={data?.id.toString()} followId={data?.followId} follow={data?.flag === "1"} onChange={refetch} />}
          </div>

          <Row justify="space-between" align="top" className={styles.teamDetail}>
            <Col flex={0}>
              <div className={styles.text}>战队人数</div>
              <span className={styles.number}>{data?.personNum || 0} 人</span>
            </Col>
            <Divider style={{ paddingTop: 20 }} type="vertical" />
            <Col flex={0}>
              <div className={styles.text}>战队总路程</div>
              <span className={styles.number}>{data?.allKm || 0} km</span>
            </Col>
            <Divider style={{ paddingTop: 20 }} type="vertical" />
            <Col flex={0}>
              <div className={styles.text}>战队人均路程</div>
              <span className={styles.number}>{data?.aveKm || 0} km</span>
            </Col>
          </Row>

          {type === "select" && <div className={styles.introduce}>
            <div className={styles.title}>战队介绍：</div>
            <div className={styles.content}>{data?.info}</div>
          </div>}

          <div className={styles.headline}>
            <div className={styles.left}><img src={UserIcon} alt="user" /><span>队员</span></div>
            <div onClick={() => setMoreVisible(true)}>全部 {'>'}</div>
          </div>
        </div>
      }
    >
      <div className={styles.userList}>
        {users.data?.map((user, index) => (
          <div key={`TeamDetailUser-${user.userId}`} className={styles.user}>
            <TeamUserLine
              id={user.userId}
              type="person"
              rank={index + 1}
              name={user.name || "--"}
              avatar={user.pic}
              number={`${user.allKm || 0}KM`}
              follow={{
                follow: user.flag === "1",
                followId: user.followId
              }}
              hidden={type === "select"}
              onAvatarClick={() => onUserClick?.(user.userId)}
              onMapClick={() => onUserClick?.(user.userId)}
              onFav={users.refetch}
            />
          </div>
        ))}
      </div>

      {type === "select" && <div className={styles.joinBtn}>
        <Button loading={joinTeamMutation.isLoading} theme="success" onClick={handleOnJoinTeam}>加入战队</Button>
      </div>}

      <TeamUsersPanel haveFollow={type === "show"} height="60vh" visible={moreVisible} onClose={() => setMoreVisible(false)} id={teamId} />

    </DrawerPanel>
  )

}

export default TeamDetailPanel;
