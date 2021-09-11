import { Badge } from 'antd';
import React, { useState } from 'react';

import Avatar from '../../../../components/Avatar';
import Button from '../../../../components/Button';
import DrawerPanel from '../../../../components/DrawerPanel';
import SNSPanel from '../../../../components/SNSPanel';
import SelfDetailPanel from '../selfDetailPanel';

import styles from './index.module.scss';

interface UserToolBarProps {
    self: boolean;
}

const UserToolBar: React.FC<UserToolBarProps> = ({ self }) => {

    const [ visible, setVisible ] = useState(false)

    const handlePointClick = () => {
        console.log("领积分")
    }

    const handleOnFollow = () => {

    }

    const avatar = "https://images.generated.photos/TLpLhkWOu0ROL4_KZsXodUeOYwWXS8evz3jO8KS40ds/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTY2NjgyLmpwZw.jpg"

    const point = 365

    const name = "孟浩"

    const steps = 10.1

    return (
        <div>
            <div className={self?styles.blockToolbar:styles.fullToolbar}>
                <div className={styles.left}>
                    <div className={styles.avatar} onClick={()=>self && setVisible(true)}>
                        <Avatar size="small" src={avatar} />
                    </div>
                    {self && <span className={styles.score}>{point}分</span>}
                    {self && <Badge dot><div className={styles.scoreBtn} onClick={handlePointClick}>领积分</div></Badge>}
                    {!self && <div className={styles.score}>{name}</div>}
                    {!self && <div className={styles.distance}>当前 <span>{steps}KM</span></div>}
                </div>
                {!self && <Button theme="success" onClick={handleOnFollow}>+关注</Button>}
            </div>
            <DrawerPanel destroyOnClose height="212px" visible={visible} onClose={() => setVisible(false)}>
                <SelfDetailPanel />
            </DrawerPanel>
        </div>
    )

}

export default UserToolBar;