import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Divider, DrawerProps, Spin } from "antd";

import Avatar from 'components/Base/Avatar';
import { PropCard } from "components/PropCard";
import PropPopup from "components/Popups/PropPopup";
import DrawerPanel from "components/Base/DrawerPanel";
import FollowButton, { FollowTeamOrUserButton } from "components/FollowButton";

import { getSomeoneStep, getStepProp } from "services";

import TeamOutloneIcon from 'assets/images/group_outline_icon.png';

import styles from './index.module.scss';

interface UserDetailPanelProps extends DrawerProps {
  userId: string;
  haveProp?: boolean;
}

const UserDetailPanel: React.FC<UserDetailPanelProps> = ({ userId, haveProp = false, ...props }) => {

  const queryClient = useQueryClient()

  const [propId, setPropId] = useState<number | undefined>(undefined)

  const user = useQuery(["teams", "users", userId], () => getSomeoneStep(userId), {
    enabled: !!props.visible,
    onSuccess: () => setPropId(undefined)
  })

  const propData = useQuery(["props"], getStepProp, { enabled: !!props.visible && haveProp })

  return (
    <DrawerPanel
      {...props}
      bodyStyle={{ paddingTop: 0 }}
      title={
        <div className={styles.panelHead}>
          {props.visible && <div className={styles.avatar}>
            <Avatar size="large" src={user.data?.pic} text={user.data?.name} />
          </div>}
          <div className={styles.user}>
            <div className={styles.total}>{user.data?.name || "--"}</div>
            {user.data?.teamName && <div className={styles.team}>
              <img src={TeamOutloneIcon} alt="" />
              <div>{user.data?.teamName}</div>
            </div>}
            <div className={styles.extra}>
              {haveProp && <FollowTeamOrUserButton
                type="person"
                mapBtn={false}
                onChange={user.refetch}
                id={userId}
                followId={parseInt(user.data?.followId || "0")}
                follow={user.data?.followFlag === "1"}
              />}
              {!haveProp && <FollowButton
                onChange={user.refetch}
                userId={userId}
                followId={user.data?.followId}
                follow={user.data?.followFlag === "1"}
              />}
            </div>
          </div>

          <div className={styles.count}>

            <div className={styles.statistic}>
              <div>个人步数</div>
              <div className={styles.badge}>{user.data?.allStep || 0}</div>
            </div>
            <Divider type="vertical" />
            <div className={styles.statistic}>
              <div>个人路程</div>
              <div className={styles.badge}>{user.data?.allKm || 0}KM</div>
            </div>

          </div>
          <div className={styles.count}>

            <div className={styles.statistic}>
              <div>战队人均步数</div>
              <div className={styles.badge}>{user.data?.aveStep || 0}</div>
            </div>
            <Divider type="vertical" />
            <div className={styles.statistic}>
              <div>战队人均路程</div>
              <div className={styles.badge}>{user.data?.aveTeamKm || 0}KM</div>
            </div>

          </div>

          {haveProp && <Divider style={{ margin: "15px 0" }} />}
        </div>
      }
    >

      {haveProp && <Spin spinning={propData.isLoading}>
        <div>
          <div className={styles.propTitle}>道具</div>
          <div className={styles.propsList}>
            {propData.data?.map(prop => <div key={prop.id} className={styles.propItem}>
              <PropCard
                point={prop.point}
                useNum={parseInt(prop.useNum)}
                surUseNum={prop.surUseNum}
                pic={prop.backPic}
                onClick={() => setPropId(prop.id)}
              />
            </div>)}
          </div>
        </div>
        <PropPopup
          id={propId}
          onCancel={() => setPropId(undefined)}
          userId={parseInt(userId)}
          onUse={() => queryClient.invalidateQueries(["teams", "users", userId])} />
      </Spin>}
    </DrawerPanel>
  )

}

export default UserDetailPanel;
