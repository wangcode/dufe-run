import { HeartFilled } from "@ant-design/icons";
import { Divider } from "antd";
import Button from '../../../Button';
import React from "react";
import Avatar from '../../../../components/Avatar';
import styles from './index.module.scss';
import FollowButton from "../../../FollowButton";

interface UserPanelProps {
    pic: string;
    name: string;
    steps: number;
    allSteps: string;
}

const UserPanel: React.FC<UserPanelProps> = ({ pic, name, steps, allSteps }) => {

    return (
        <div>
            <div className={styles.avatar}>
                <Avatar src="https://images.generated.photos/TLpLhkWOu0ROL4_KZsXodUeOYwWXS8evz3jO8KS40ds/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTY2NjgyLmpwZw.jpg" />
            </div>
            <div className={styles.user}>
                <div className={styles.total}>孟浩</div>
                <div className={styles.extra}>获得积分：356</div>
            </div>
            <Divider style={{margin: "15px 0"}} />
            <div className={styles.progress}>
                <div className={styles.total}>今日步数：<strong>16364</strong></div>
            </div>
            <div className={styles.progress}>
                <div className={styles.total}>已走路程：<strong>15<em>KM</em></strong></div>
            </div>
            <div className={styles.buttons}>
                <Button>查看</Button>
                <FollowButton follow={true} />
            </div>
        </div>
    )

}

export default UserPanel;