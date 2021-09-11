import { HeartFilled } from "@ant-design/icons";
import { Avatar, Divider } from "antd";
import Button from '../../../Button';
import React from "react";
import styles from './index.module.scss';

const UserPanel = () => {

    return (
        <div>
            <div>
                <Avatar src="https://images.generated.photos/TLpLhkWOu0ROL4_KZsXodUeOYwWXS8evz3jO8KS40ds/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTY2NjgyLmpwZw.jpg" />
            </div>
            <div className={styles.progress}>
                <div className={styles.total}>孟浩</div>
                <div className={styles.surplus}>获得积分：356</div>
            </div>
            <Divider style={{margin: "15px 0"}} />
            <div className={styles.progress}>
                <div className={styles.total}>今日步数：<strong>16364</strong></div>
            </div>
            <div className={styles.progress}>
                <div className={styles.total}>已走路程：<strong>15<em>KM</em></strong></div>
            </div>
            <div>
                <Button>查看</Button>
                <Button theme="success" icon={<HeartFilled />}>关注</Button>
            </div>
        </div>
    )

}

export default UserPanel;