import { Badge } from 'antd';
import React from 'react';

import Avatar from '../../../../components/Avatar';
import Button from '../../../../components/Button';

import styles from './index.module.scss';

interface UserToolBarProps {
    self: boolean;
}

const UserToolBar: React.FC<UserToolBarProps> = ({ self }) => {

    const handlePointClick = () => {
        console.log("领积分")
    }

    return (
        <div className={self?styles.blockToolbar:styles.fullToolbar}>
            <div className={styles.left}>
                <div className={styles.avatar}>
                    <Avatar size="small" src="https://images.generated.photos/TLpLhkWOu0ROL4_KZsXodUeOYwWXS8evz3jO8KS40ds/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTY2NjgyLmpwZw.jpg" />
                </div>
                {self && <span className={styles.score}>365分</span>}
                {self && <Badge dot><div className={styles.scoreBtn} onClick={handlePointClick}>领积分</div></Badge>}
                {!self && <div className={styles.score}>孟浩</div>}
                {!self && <div className={styles.distance}>当前 <span>10.1KM</span></div>}
            </div>
            {!self && <Button theme="success">+关注</Button>}
        </div>
    )

}

export default UserToolBar;