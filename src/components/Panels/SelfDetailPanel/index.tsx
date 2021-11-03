import React from "react";
import { DrawerProps, Spin } from "antd";
import numeral from 'numeral';
import { useQuery } from "react-query";

import { getMySteps } from "services";

import Avatar from 'components/Base/Avatar';
import DrawerPanel from "components/Base/DrawerPanel";

import HelloPNG from 'assets/images/hello.png'

import styles from './index.module.scss';

interface SelfDetailPanelProps extends DrawerProps {
}

const SelfDetailPanel: React.FC<SelfDetailPanelProps> = (props) => {

  const { data, isLoading } = useQuery("mySteps", getMySteps, { enabled: props.visible })

  return (
    <DrawerPanel {...props}>
      {props.visible && <div className={styles.avatar}>
        <Avatar size="large" src={data?.pic} text={data?.name} />
      </div>}
      <Spin spinning={isLoading}>
        <div className={styles.user}>
          <img width={43} height={46} src={HelloPNG} alt="" />
          <div className={styles.name}>{data?.name || "-"}</div>
        </div>
        <div className={styles.blocks}>
          <div className={styles.box}>
            <div className={styles.detail}>总步数：<br /><strong>{numeral(data?.allStep).format("0,0")}</strong></div>
            {/* <div className={styles.extra}>千里之行，始于足下</div> */}
          </div>
          <div className={styles.box}>
            <div className={styles.detail}>总公里数：<strong>{data?.allKm || "0"}KM</strong></div>
            <div className={styles.extra}>千里之行，始于足下</div>
          </div>
        </div>
      </Spin>
    </DrawerPanel>
  )

}

export default SelfDetailPanel;
