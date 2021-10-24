import React from "react";
import { useQuery } from "react-query";
import { Divider, DrawerProps, Spin } from "antd";
import { useHistory } from "react-router-dom";

import Button from 'components/Base/Button';
import Avatar from 'components/Base/Avatar';
import FollowButton from "components/FollowButton";
import { FollowFlag, getSomeoneStep } from "services";
import { transStep2Kilometer } from "utils";

import DrawerPanel from "components/Base/DrawerPanel";

import TeamOutloneIcon from 'assets/images/group_outline_icon.png';

import styles from './index.module.scss';

interface UserDetailPanelProps extends DrawerProps {
    userId: string;
}

const UserDetailPanel: React.FC<UserDetailPanelProps> = ({ userId, ...props }) => {

    const history = useHistory()

    const { data, refetch, isLoading } = useQuery(["user", userId, "detail"], () => getSomeoneStep(userId), { enabled: props.visible })

    return (
        <DrawerPanel {...props}>
            <div className={styles.avatar}>
                <Avatar src={data?.pic} text={data?.name} />
            </div>
            <Spin spinning={isLoading}>
                <div className={styles.user}>
                    <div className={styles.total}>{"孟浩"}</div>
                    <div className={styles.team}>
                        <img src={TeamOutloneIcon} alt="" />
                        <div>辽宁战队</div>
                    </div>
                    <div className={styles.extra}>
                        <FollowButton onChange={refetch} userId={userId} followId={data?.followId} follow={data?.followFlag === FollowFlag.follow} />
                    </div>
                </div>

                <div>

                </div>

                <Divider style={{ margin: "15px 0" }} />

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