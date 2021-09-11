import React from "react";

import numeral from 'numeral';

import Avatar from '../../../../components/Avatar';

import styles from './index.module.scss';

const SelfDetailPanel = () => {

    const avatar = "https://images.generated.photos/TLpLhkWOu0ROL4_KZsXodUeOYwWXS8evz3jO8KS40ds/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTY2NjgyLmpwZw.jpg"

    const name = "王灿"

    const steps = 4636

    const calorie = 115

    return (
        <div>
            <div className={styles.avatar}>
                <Avatar src={avatar} />
            </div>
            <div>
                <div className={styles.name}>{name}</div>
            </div>
            <div className={styles.blocks}>
                <div className={styles.box}>
                    <div className={styles.detail}>总步数：<strong>{numeral(steps).format("0,0")}</strong></div>
                    <div className={styles.extra}>千里之行，始于足下</div>
                </div>
                <div className={styles.box}>
                    <div className={styles.detail}>消耗卡路里：<strong>{calorie}</strong></div>
                    <div className={styles.extra}>准备燃烧我的卡路里</div>
                </div>
            </div>
        </div>
    )

}

export default SelfDetailPanel;