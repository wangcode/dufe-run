import React, { useMemo } from 'react';
import { Divider, DrawerProps, Progress, Spin } from 'antd';
import { getMySteps, getMyStepTeam, TOTAL_KM, TOTAL_LENGTH } from 'services';
import { useQuery } from 'react-query';
import DrawerPanel from 'components/Base/DrawerPanel';

import TeamIcon from 'assets/images/group_icon.png';
import styles from './index.module.scss';

interface TeamProgressPanelProps extends DrawerProps { }

const TeamProgressPanel: React.FC<TeamProgressPanelProps> = (props) => {

  const mySteps = useQuery("mySteps", getMySteps, { enabled: props.visible })

  const myTeam = useQuery(["teams", mySteps.data?.teamId], () => getMyStepTeam(mySteps.data?.teamId!), { enabled: !!mySteps.data?.teamId })

  const TotalKM = TOTAL_LENGTH / 1000

  const percent = useMemo(() => {
    if (!myTeam.data?.allKm) return 0
    return myTeam.data?.allKm / TotalKM
  }, [myTeam, TotalKM])

  return (
    <DrawerPanel {...props}>
      <div className={styles.title}>酷程毅行校园游</div>
      <Spin spinning={mySteps.isLoading || myTeam.isLoading} >

        <div className={styles.team}>
          <img src={TeamIcon} alt="team" />
          <span>您的战队：</span>
          <div className={styles.name}>{myTeam.data?.name || "--"}</div>
        </div>

        <div className={styles.statistic}>
          <div className={styles.count}>
            <div>个人步数</div>
            <div className={styles.number}>{mySteps.data?.allStep || 0}</div>
          </div>
          <Divider type="vertical" />
          <div className={styles.count}>
            <div>个人路程</div>
            <div className={styles.number}>{mySteps.data?.allKm || 0}KM</div>
          </div>
          <Divider type="vertical" />
          <div className={styles.count}>
            <div>战队人均步数</div>
            <div className={styles.number}>{myTeam.data?.aveStep || 0}</div>
          </div>
          <Divider type="vertical" />
          <div className={styles.count}>
            <div>战队人均路程</div>
            <div className={styles.number}>{myTeam.data?.aveKm || 0}KM</div>
          </div>
        </div>

        <Divider />
        <div className={styles.progress}>
          <div className={styles.total}>全程：<strong>{TotalKM}<em>KM</em></strong></div>
          {/* {myTeam.data?.allKm && <div className={styles.surplus}>还差 {(TotalKM - myTeam.data.allKm) || TotalKM}km 到达终点</div>} */}
          {(myTeam.data?.allKm || 0) < TOTAL_KM && <div className={styles.surplus}>还差 {TOTAL_KM - (myTeam.data?.allKm || 0)}km 到达终点</div>}
          {(myTeam.data?.allKm || 0) >= TOTAL_KM && <div className={styles.surplus}>您已经到达终点</div>}
        </div>
        <Progress strokeColor={{ from: "#c216fb", to: "#1244A8" }} percent={percent * 100} showInfo={false} />
      </Spin>
    </DrawerPanel>
  )
}

export default TeamProgressPanel;
