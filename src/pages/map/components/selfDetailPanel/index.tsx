import React from "react";
import { Spin } from "antd";
import numeral from 'numeral';
import { useQuery } from "react-query";

import Avatar from 'components/Base/Avatar';
import { getMySteps } from "services";

// import HiPNG from 'assets/images/hi.png';
import HelloPNG from 'assets/images/hello.png'

import styles from './index.module.scss';

interface SelfDetailPanelProps {
}

const SelfDetailPanel: React.FC<SelfDetailPanelProps> = ({ }) => {

    const { data, isLoading } = useQuery("mySteps", getMySteps)

    return (
        <div>
            <div className={styles.avatar}>
                <Avatar src={data?.pic} text={data?.name} />
            </div>
            <Spin spinning={isLoading}>
                <div className={styles.user}>
                    <img width={43} height={46} src={HelloPNG} alt="" />
                    <div className={styles.name}>{data?.name || "-"}</div>
                </div>
                <div className={styles.blocks}>
                    <div className={styles.box}>
                        <div className={styles.detail}>总步数：<strong>{numeral(data?.allStep).format("0,0")}</strong></div>
                        <div className={styles.extra}>千里之行，始于足下</div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.detail}>消耗卡路里：<strong>{parseInt(data?.allStep || "0") * 0.5}</strong></div>
                        <div className={styles.extra}>准备燃烧我的卡路里</div>
                    </div>
                </div>
            </Spin>
        </div>
    )

}

export default SelfDetailPanel;