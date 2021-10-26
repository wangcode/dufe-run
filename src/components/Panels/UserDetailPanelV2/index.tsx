import React from "react";
import { useQuery } from "react-query";
import { Divider, DrawerProps, Spin } from "antd";

import Avatar from 'components/Base/Avatar';
import { FollowTeamUserButton } from "components/FollowButton";
import { FollowFlag, getSomeoneStep } from "services";

import DrawerPanel from "components/Base/DrawerPanel";

import TeamOutloneIcon from 'assets/images/group_outline_icon.png';

import styles from './index.module.scss';

interface UserDetailPanelProps extends DrawerProps {
  userId: string;
}

const UserDetailPanel: React.FC<UserDetailPanelProps> = ({ userId, ...props }) => {

  const { data, refetch, isLoading } = useQuery(["user", userId, "detail"], () => getSomeoneStep(userId), { enabled: props.visible })

  return (
    <DrawerPanel
      {...props}
      title={
        <div className={styles.panelHead}>
          <div className={styles.avatar}>
            <Avatar size="large" src={data?.pic} text={data?.name} />
          </div>
          <div className={styles.user}>
            <div className={styles.total}>{data?.name}</div>
            {data?.teamName && <div className={styles.team}>
              <img src={TeamOutloneIcon} alt="" />
              <div>{data?.teamName}</div>
            </div>}
            <div className={styles.extra}>
              <FollowTeamUserButton
                mapBtn={false}
                onChange={refetch}
                userId={userId}
                followId={parseInt(data?.followId || "0")}
                follow={data?.followFlag === FollowFlag.follow}
              />
            </div>
          </div>

          <div className={styles.count}>

            <div className={styles.statistic}>
              <div>个人步数</div>
              <div className={styles.badge}>{data?.allStep}</div>
            </div>
            <Divider type="vertical" />
            <div className={styles.statistic}>
              <div>个人路程</div>
              <div className={styles.badge}>{data?.allKm}</div>
            </div>

          </div>
          <div className={styles.count}>

            <div className={styles.statistic}>
              <div>战队人均步数</div>
              <div className={styles.badge}>{data?.aveStep}</div>
            </div>
            <Divider type="vertical" />
            <div className={styles.statistic}>
              <div>战队人均路程</div>
              <div className={styles.badge}>{data?.aveTeamKm}</div>
            </div>

          </div>

          <Divider style={{ margin: "15px 0" }} />
        </div>
      }
    >

      <Spin spinning={isLoading}>


        <div>
          <div>道具</div>
          <div>

          </div>
        </div>

      </Spin>
    </DrawerPanel>
  )

}

export default UserDetailPanel;
