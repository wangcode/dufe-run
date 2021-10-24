import React from "react";
import { useQuery } from "react-query";
import { Badge, Divider, DrawerProps, Spin } from "antd";
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
                        <div className={styles.total}>{"孟浩"}</div>
                        {data?.teamName && <div className={styles.team}>
                            <img src={TeamOutloneIcon} alt="" />
                            <div>{"123"}</div>
                        </div>}
                        <div className={styles.extra}>
                            <FollowButton onChange={refetch} userId={userId} followId={data?.followId} follow={data?.followFlag === FollowFlag.follow} />
                        </div>
                    </div>

                    <div className={styles.count}>

                        <div>
                            <div>个人步数</div>
                            <div className={styles.badge}>16233</div>
                        </div>
                        <Divider type="vertical" />
                        <div>
                            <div>个人步数</div>
                            <div className={styles.badge}>16233</div>
                        </div>

                    </div>
                    <div className={styles.count}>

                        <div>
                            <div>个人步数</div>
                            <div className={styles.badge}>123123123</div>
                        </div>
                        <Divider type="vertical" />
                        <div>
                            <div>个人步数</div>
                            <div className={styles.badge}>16233</div>
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