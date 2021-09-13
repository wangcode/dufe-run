import React from "react";

import numeral from 'numeral';

import Avatar from '../../../../components/Avatar';

import HiPNG from '../../../../assets/images/hi.png';

import styles from './index.module.scss';

interface SelfDetailPanelProps {
    name: string;
    pic: string;
    steps: string;
    calorie: string;
}

const SelfDetailPanel: React.FC<SelfDetailPanelProps> = ({ name, pic, steps, calorie }) => {

    return (
        <div>
            <div className={styles.avatar}>
                <Avatar src={pic} />
            </div>
            <div className={styles.user}>
                <img width={70} height={52} src={HiPNG} alt="" />
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