import Card from '../../components/Card';
import React, { useState } from 'react';
import Button from '../../components/Button';
import TeamBox from '../../components/TeamBox';

import RuleIcon from '../../assets/images/rule_icon.png';
import TimeOutlineIcon from '../../assets/images/time_outline_icon.png';
import GroupOutlineIcon from '../../assets/images/group_outline_icon.png';

import styles from './index.module.scss';
import { Col, Row } from 'antd';
import DrawerPanel from '../../components/DrawerPanel';
import TeamPanel from '../../components/TeamPanel';

interface TeamSelectProps{

}

const TeamSelect: React.FC<TeamSelectProps> = () => {

    const [selected, setSelected] = useState<number|undefined>(undefined)

    return (
        <div className={styles.teamselect}>
            <Card>
                <div className={styles.cardInner}>

                    <div>
                        <div className={styles.title}>
                            <img src={RuleIcon} alt="" />
                            <div>战队赛规则</div>
                        </div>
                        <div className={styles.content}>啊手动阀手动阀手动阀手动阀手动阀手动阀</div>
                    </div>

                    <div>
                        <div className={styles.title}>
                            <img src={TimeOutlineIcon} alt="" />
                            <div>活动时间</div>
                        </div>
                        <strong className={styles.content}>啊手动阀手动阀手动阀手动阀手动阀手动阀</strong>
                    </div>

                    <div className={styles.detailBtn}>
                        <Button size="middle" theme="hot">活动具体说明</Button>
                    </div>

                    <div>
                        <div className={styles.title_noborder}>
                            <img src={GroupOutlineIcon} alt="" />
                            <div>选择战队</div>
                        </div>
                        <div>
                            <Row gutter={[25, 15]}>
                                <Col onClick={() => setSelected(1)} span={6}><TeamBox name="北京" rank={15} count={6000} /></Col>
                                <Col onClick={() => setSelected(1)} span={6}><TeamBox name="北京" rank={15} count={6000} /></Col>
                                <Col onClick={() => setSelected(1)} span={6}><TeamBox name="北京" rank={15} count={6000} /></Col>
                                <Col onClick={() => setSelected(1)} span={6}><TeamBox name="北京" rank={15} count={6000} /></Col>
                                <Col onClick={() => setSelected(1)} span={6}><TeamBox name="北京" rank={15} count={6000} /></Col>
                            </Row>
                        </div>
                    </div>

                </div>
            </Card>

            <div>
            <DrawerPanel
                visible={!!selected}
                destroyOnClose
                height="85vh"
                onClose={() => setSelected(undefined)}
            >
                <TeamPanel />
            </DrawerPanel>
            </div>

        </div>
    )

}

export default TeamSelect;