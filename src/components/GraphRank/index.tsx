import React, { useState } from 'react';
import styles from './index.module.scss';

import GoldLogo from '../../assets/images/gold_logo.png';
import GoldBar from '../../assets/images/gold_bar.png';
import SilverLogo from '../../assets/images/silver_logo.png';
import SilverBar from '../../assets/images/silver_bar.png';
import BronzeLogo from '../../assets/images/bronze_logo.png';
import BronzeBar from '../../assets/images/bronze_bar.png';

const GraphRank = () => {

    return (
        <div className={styles.rankGraph}>
            <div className={styles.silver}>
                <img src={SilverLogo} alt="" />
                <div className={styles.detail}>
                    <div>辽宁战队</div>
                    <div>30KM</div>
                </div>
                <img src={SilverBar} alt="" />
            </div>
            <div className={styles.gold}>
                <img src={GoldLogo} alt="" />
                <div className={styles.detail}>
                    <div>辽宁战队</div>
                    <div>30KM</div>
                </div>
                <img src={GoldBar} alt="" />
            </div>
            <div className={styles.bronze}>
                <img src={BronzeLogo} alt="" />
                <div className={styles.detail}>
                    <div>辽宁战队</div>
                    <div>30KM</div>
                </div>
                <img src={BronzeBar} alt="" />
            </div>
        </div>
    )
}

export default GraphRank;