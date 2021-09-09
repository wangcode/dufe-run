import React, { useState } from 'react';
import Avatar from '../../../../components/Avatar';
import DrawerPanel from '../../../../components/DrawerPanel';

import styles from './index.module.scss';

interface UserMarkProps {

}

const UserMark: React.FC<UserMarkProps> = () => {


    const [ visible, setVisible ] = useState(false)

    return (
        <div>
            <div onClick={() => setVisible(true)}>
                <Avatar src="https://images.generated.photos/TLpLhkWOu0ROL4_KZsXodUeOYwWXS8evz3jO8KS40ds/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTY2NjgyLmpwZw.jpg" />
            </div>
            <DrawerPanel destroyOnClose height="212px" visible={visible} onClose={() => setVisible(false)}>
                <div className={styles.avatar}>
                    <Avatar src="https://images.generated.photos/TLpLhkWOu0ROL4_KZsXodUeOYwWXS8evz3jO8KS40ds/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTY2NjgyLmpwZw.jpg" />
                </div>
                <div>
                    <div className={styles.name}>王灿</div>
                </div>
                <div className={styles.blocks}>
                    <div className={styles.box}>
                        <div className={styles.detail}>总步数：<strong>4,636</strong></div>
                        <div className={styles.extra}>千里之行，始于足下</div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.detail}>消耗卡路里：<strong>115</strong></div>
                        <div className={styles.extra}>准备燃烧我的卡路里</div>
                    </div>
                </div>
            </DrawerPanel>
        </div>
    )
}

export default UserMark;