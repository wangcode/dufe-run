import React from "react";
import { useQuery } from "react-query";
import { Divider, Spin } from "antd";
import { useHistory } from "react-router-dom";

import Button from 'components/Base/Button';
import Avatar from 'components/Base/Avatar';
import FollowButton from "components/FollowButton";
import { FollowFlag, getSomeoneStep } from "services";
import { transStep2Kilometer } from "utils";

import styles from './index.module.scss';

interface UserPanelProps {
    userId: string;
}

const UserPanel: React.FC<UserPanelProps> = ({ userId }) => {

    const history = useHistory()

    const { data, refetch, isLoading } = useQuery(["user", userId, "detail"], () => getSomeoneStep(userId))

    return (
        <div>
            <div className={styles.avatar}>
                <Avatar src={data?.pic} text={data?.name} />
            </div>
            <Spin spinning={isLoading}>
                <div className={styles.user}>
                    <div className={styles.total}>{data?.name}</div>
                    <div className={styles.extra}>获得积分：356</div>
                </div>
                <Divider style={{ margin: "15px 0" }} />
                <div className={styles.progress}>
                    <div className={styles.total}>今日步数：<strong>{data?.nowStep}</strong></div>
                </div>
                <div className={styles.progress}>
                    <div className={styles.total}>已走路程：<strong>{transStep2Kilometer(data?.allStep)}<em>KM</em></strong></div>
                </div>
                <div className={styles.buttons}>
                    {/* todo */}
                    <Button onClick={() => history.push(`/map?user=${data?.userId}`)}>查看</Button>
                    <FollowButton onChange={refetch} userId={userId} followId={data?.followId} follow={data?.followFlag === FollowFlag.follow} />
                </div>
            </Spin>
        </div>
    )

}

export default UserPanel;