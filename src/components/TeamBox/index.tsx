import React from 'react';

import styles from './index.module.scss';
import CrownIcon from '../../assets/images/crown_icon.png';

interface TeamBoxProps {
    name: string;
    rank: number;
    count: number;
}

const TeamBox: React.FC<TeamBoxProps> = (props) => {
    return (
        <div className={styles.teambox}>
            <div className={styles.title}>{props.name}</div>
            <div className={styles.rank}>
                <img src={CrownIcon} alt="" />
                <div>第{props.rank}名</div>
            </div>
            <div className={styles.people}>{props.count>5000?"5000+":props.count} 人</div>
        </div>
    )
}

export default TeamBox;