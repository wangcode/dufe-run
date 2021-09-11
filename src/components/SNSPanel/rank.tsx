import React from 'react';

import { Divider, Tabs } from 'antd';

import styles from './index.module.scss';
import UserLine from '../UserLine';


const Rank = () => {

    return (
        <div>
            <UserLine
                rank={1}
                name="孟浩"
                avatar="https://images.generated.photos/TLpLhkWOu0ROL4_KZsXodUeOYwWXS8evz3jO8KS40ds/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTY2NjgyLmpwZw.jpg"
            />
        </div>
    )

}

export default Rank;