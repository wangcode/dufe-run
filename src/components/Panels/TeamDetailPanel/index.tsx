import React from 'react';
import { Col, DrawerProps, Row } from 'antd';
import FollowButton from 'components/FollowButton';
import DrawerPanel from 'components/Base/DrawerPanel';
import Button from 'components/Base/Button';

import TeamIcon from 'assets/images/group_icon.png'
import CrownIcon from 'assets/images/crown_outline_icon.png';

import styles from './index.module.scss';

interface TeamDetailPanelProps extends DrawerProps { }

const TeamDetailPanel: React.FC<TeamDetailPanelProps> = (props) => {


    return (
        <DrawerPanel {...props}>

            <div>

                <div className={styles.head}>
                    <div className={styles.left}>
                        <img src={TeamIcon} alt="" />
                        <div>辽宁战队</div>
                    </div>
                    {false && <div className={styles.right}>
                        <img src={CrownIcon} alt="" />
                        <div>第1名</div>
                    </div>}
                    {true && <FollowButton userId={"1"} followId={"1"} follow={false} />}
                </div>


                <Row justify="space-between" className={styles.teamDetail}>
                    <Col flex={0}>
                        <div className={styles.text}>战队人数</div>
                        <span className={styles.number}>1213人</span>
                    </Col>
                    <Col flex={0}>
                        <div className={styles.text}>战队总路程</div>
                        <span className={styles.number}>432.3km</span>
                    </Col>
                    <Col flex={0}>
                        <div className={styles.text}>战队人均路程</div>
                        <span className={styles.number}>15.2km</span>
                    </Col>
                </Row>

                <div className={styles.introduce}>
                    <div className={styles.title}>战队介绍：</div>
                    <div className={styles.content}>
                        这里是介绍
                    </div>
                </div>

                <div>
                    <div>
                        <div>队员</div>
                        <div>全部</div>
                    </div>
                </div>

                <div className={styles.joinBtn}>
                    <Button theme="success">加入战队</Button>
                </div>

            </div>
        </DrawerPanel>
    )

}

export default TeamDetailPanel;