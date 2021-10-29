import React from "react";
import { useQuery } from "react-query";
import { Divider, DrawerProps, Spin } from "antd";
// import { useHistory } from "react-router-dom";
// import Button from 'components/Base/Button';
import Avatar from 'components/Base/Avatar';
import FollowButton from "components/FollowButton";
import { getSomeoneStep } from "services";

import DrawerPanel from "components/Base/DrawerPanel";

import styles from './index.module.scss';

interface UserDetailPanelProps extends DrawerProps {
  userId: string;
}

const UserDetailPanel: React.FC<UserDetailPanelProps> = ({ userId, ...props }) => {

  const { data, refetch, isLoading } = useQuery(["user", userId, "detail"], () => getSomeoneStep(userId), { enabled: props.visible })

  return (
    <DrawerPanel {...props}>
      {props.visible && <div className={styles.avatar}>
        <Avatar size="large" src={data?.pic} text={data?.name} />
      </div>}
      <Spin spinning={isLoading}>
        <div className={styles.user}>
          <div className={styles.total}>{data?.name || "--"}</div>
          {data?.teamName && <div className={styles.extra}>所属战队：{data?.teamName}</div>}
        </div>
        <Divider style={{ margin: "15px 0" }} />
        <div className={styles.progress}>
          <div className={styles.total}>今日步数：<strong>{data?.nowStep || 0}</strong></div>
        </div>
        <div className={styles.progress}>
          <div className={styles.total}>已走路程：<strong>{data?.allKm || 0}<em>KM</em></strong></div>
        </div>
        <div className={styles.buttons}>
          {/* <Button onClick={() => history.push(`/person?user=${data?.userId}`)}>查看</Button> */}
          <FollowButton onChange={refetch} userId={userId} followId={data?.followId} follow={data?.followFlag === "1"} />
        </div>
      </Spin>
    </DrawerPanel>
  )

}

export default UserDetailPanel;
