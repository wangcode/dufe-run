import React, { useState } from 'react';
import Avatar from 'components/Base/Avatar';
import DrawerPanel from 'components/Base/DrawerPanel';

import styles from './index.module.scss';

interface UserMarkProps {

}

const UserMark: React.FC<UserMarkProps> = () => {

    return (
        <div>
            <div>
                <Avatar src="https://images.generated.photos/TLpLhkWOu0ROL4_KZsXodUeOYwWXS8evz3jO8KS40ds/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTY2NjgyLmpwZw.jpg" />
            </div>

        </div>
    )
}

export default UserMark;