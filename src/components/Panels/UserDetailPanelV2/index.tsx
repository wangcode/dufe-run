import React, { useState } from "react";
import { useQuery } from "react-query";
import { Col, Divider, DrawerProps, Row, Spin } from "antd";

import Avatar from 'components/Base/Avatar';
import FollowButton, { FollowTeamUserButton } from "components/FollowButton";
import { FollowFlag, getSomeoneStep, getStepProp } from "services";

import DrawerPanel from "components/Base/DrawerPanel";

import TeamOutloneIcon from 'assets/images/group_outline_icon.png';

import styles from './index.module.scss';
import { PropCard } from "components/PropCard";
import PropPopup from "components/Popups/PropPopup";

interface UserDetailPanelProps extends DrawerProps {
  userId: string;
  haveProp: boolean;
}

const UserDetailPanel: React.FC<UserDetailPanelProps> = ({ userId, haveProp, ...props }) => {

  const { data, refetch, isLoading } = useQuery(["user", userId, "detail"], () => getSomeoneStep(userId), {
    enabled: props.visible,
    onSuccess: () => setPropId(undefined)
  })

  const propData = useQuery(["props"], getStepProp, { enabled: !!userId })

  const [propId, setPropId] = useState<number | undefined>(undefined)

  const handleOnPropUse = (id: number) => {
    setPropId(id)
  }

  return (
    <DrawerPanel
      {...props}
      title={
        <div className={styles.panelHead}>
          {props.visible && <div className={styles.avatar}>
            <Avatar size="large" src={data?.pic} text={data?.name} />
          </div>}
          <div className={styles.user}>
            <div className={styles.total}>{data?.name || "--"}</div>
            {data?.teamName && <div className={styles.team}>
              <img src={TeamOutloneIcon} alt="" />
              <div>{data?.teamName}</div>
            </div>}
            <div className={styles.extra}>
              {haveProp && <FollowTeamUserButton
                mapBtn={false}
                onChange={refetch}
                userId={userId}
                followId={parseInt(data?.followId || "0")}
                follow={data?.followFlag === FollowFlag.follow}
              />}
              {!haveProp && <FollowButton
                onChange={refetch}
                userId={userId}
                followId={data?.followId}
                follow={data?.followFlag === FollowFlag.follow}
              />}
            </div>
          </div>

          <div className={styles.count}>

            <div className={styles.statistic}>
              <div>个人步数</div>
              <div className={styles.badge}>{data?.allStep || 0}</div>
            </div>
            <Divider type="vertical" />
            <div className={styles.statistic}>
              <div>个人路程</div>
              <div className={styles.badge}>{data?.allKm || 0}KM</div>
            </div>

          </div>
          <div className={styles.count}>

            <div className={styles.statistic}>
              <div>战队人均步数</div>
              <div className={styles.badge}>{data?.aveStep || 0}</div>
            </div>
            <Divider type="vertical" />
            <div className={styles.statistic}>
              <div>战队人均路程</div>
              <div className={styles.badge}>{data?.aveTeamKm || 0}KM</div>
            </div>

          </div>

          {haveProp && <Divider style={{ margin: "15px 0" }} />}
        </div>
      }
    >

      {haveProp && <Spin spinning={isLoading}>

        <div>
          <div>道具</div>
          <Row>
            {propData.data?.map(prop => <Col key={prop.id}>
              <PropCard {...prop} onClick={() => handleOnPropUse(prop.id)} />
            </Col>)}
          </Row>
        </div>
        <PropPopup id={propId} onCancel={() => setPropId(undefined)} userId={parseInt(userId)} onUse={refetch} />

      </Spin>}
    </DrawerPanel>
  )

}

export default UserDetailPanel;
