import React from 'react';
import { useQuery } from 'react-query';
import { Col, Divider, DrawerProps, Row } from 'antd';
import Toast from 'light-toast';
import FollowButton from 'components/FollowButton';
import DrawerPanel from 'components/Base/DrawerPanel';
import Button from 'components/Base/Button';
import TeamUserLine from 'components/User/TeamUserLine';

import { getMyStepTeam, getStepTeamPerson, joinStepTeam } from 'services';

import UserIcon from 'assets/images/user_icon.png'
import TeamIcon from 'assets/images/group_icon.png'
import CrownIcon from 'assets/images/crown_outline_icon.png';

import styles from './index.module.scss';
import { useAsyncFn } from 'react-use';

interface TeamDetailPanelProps extends DrawerProps {
    teamId?: string;
}

const TeamDetailPanel: React.FC<TeamDetailPanelProps> = ({teamId, ...props}) => {

    const { data, isLoading, refetch: refetchTeam } = useQuery(["teams", teamId], () => getMyStepTeam(teamId!), {enabled: !!teamId})

    const { data: users, isLoading: userLoading, refetch: refetchUsers } = useQuery(["teams", teamId, "users"], () => getStepTeamPerson(teamId!), {enabled: !!teamId})

    const [{loading: joinLoading}, joinTeam ] = useAsyncFn(joinStepTeam)

    const handleOnJoinTeam = () => {
        if(!teamId) return
        joinTeam(teamId)
            .then(() => {
                Toast.info("加入成功！")
                refetchTeam()
                refetchUsers()
            })

    }

    return (
        <DrawerPanel loading={isLoading || userLoading} bodyStyle={{paddingLeft: 17, paddingRight: 17}} {...props}>

            <div className={styles.head}>
                <div className={styles.left}>
                    <img src={TeamIcon} alt="" />
                    <div>{data?.name}</div>
                </div>
                {false && <div className={styles.right}>
                    <img src={CrownIcon} alt="" />
                    <div>第 {data?.allRank} 名</div>
                </div>}
                {true && <FollowButton userId={"1"} followId={"1"} follow={false} />}
            </div>


            <Row justify="space-between" align="top" className={styles.teamDetail}>
                <Col flex={0}>
                    <div className={styles.text}>战队人数</div>
                    <span className={styles.number}>{data?.personNum} 人</span>
                </Col>
                <Divider style={{paddingTop: 20}} type="vertical" />
                <Col flex={0}>
                    <div className={styles.text}>战队总路程</div>
                    <span className={styles.number}>{data?.allKm} km</span>
                </Col>
                <Divider style={{paddingTop: 20}} type="vertical" />
                <Col flex={0}>
                    <div className={styles.text}>战队人均路程</div>
                    <span className={styles.number}>{data?.aveKm} km</span>
                </Col>
            </Row>

            <div className={styles.introduce}>
                <div className={styles.title}>战队介绍：</div>
                <div className={styles.content}>{data?.info}</div>
            </div>

            <div className={styles.headline}>
                <div className={styles.left}><img src={UserIcon} alt="user" /><span>队员</span></div>
                <div>全部 {'>'}</div>
            </div>

            <div className={styles.userList}>
                {users?.map(user => (
                    <div key={user.userId} className={styles.user}>
                        <TeamUserLine name={user.name} avatar={user.pic} number={`${user.allKm}KM`} />
                    </div>
                ))}
            </div>

            <div className={styles.joinBtn}>
                <Button loading={joinLoading} theme="success" onClick={handleOnJoinTeam}>加入战队</Button>
            </div>

        </DrawerPanel>
    )

}

export default TeamDetailPanel;