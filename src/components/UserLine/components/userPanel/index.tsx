import { HeartFilled } from "@ant-design/icons";
import { Divider } from "antd";
import Button from '../../../Button';
import React from "react";
import Avatar from '../../../../components/Avatar';
import styles from './index.module.scss';
import FollowButton from "../../../FollowButton";
import { useQuery } from "react-query";
import { getSomeoneStep } from "../../../../services";
import { useHistory } from "react-router";

interface UserPanelProps {
    userId: string;
}

const UserPanel: React.FC<UserPanelProps> = ({ userId }) => {

    const history = useHistory();

    const { data, refetch } = useQuery(["users", userId,  "detail"], () => getSomeoneStep(userId))

    return (
        <div>
            <div className={styles.avatar}>
                <Avatar src={data?.pic||""} />
            </div>
            <div className={styles.user}>
                <div className={styles.total}>{data?.name}</div>
                <div className={styles.extra}>获得积分：356</div>
            </div>
            <Divider style={{margin: "15px 0"}} />
            <div className={styles.progress}>
                <div className={styles.total}>今日步数：<strong>{data?.nowStep}</strong></div>
            </div>
            <div className={styles.progress}>
                <div className={styles.total}>已走路程：<strong>{data?.allStep}<em>KM</em></strong></div>
            </div>
            <div className={styles.buttons}>
                <Button onClick={() => history.push(`/map?userid=${userId}`)}>查看</Button>
                <FollowButton userId={userId} follow={data?.followFlag==="1"} onChange={refetch} />
            </div>
        </div>
    )

}

export default UserPanel;