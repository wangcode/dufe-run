import { Col, Row } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import Card from 'components/Base/Card';

import styles from './index.module.scss';
import TeamDetailPanel from 'components/Panels/TeamDetailPanel';

interface TeamRankItemProps {
    rank: number;
    name: string;
    people: number;
    length: number;
    single?: boolean;
}

export const TeamRankItem: React.FC<TeamRankItemProps> = (props) => {

    return (
        <Row className={classNames({ [styles.single]: props.single })} align="middle">
            <Col className={styles.rank} span={4}>15</Col>
            <Col className={styles.name} span={11}>{props.name}</Col>
            <Col className={`${styles.people}`} span={5}>{props.people}人</Col>
            <Col className={styles.length} span={4}>1.5KM</Col>
        </Row>
    )
}

const TeamRank = () => {

    const [teamId, setTeamId] = useState("")

    return (
        <Card title="战队排行榜">
            {[1, 2, 3, 4].map(item => {
                return (
                    <div className={styles.teamListItem} onClick={() => setTeamId(item.toFixed(0))}>
                        <TeamRankItem rank={item} name={`战队 - ${item}`} people={item * 11} length={item} />
                    </div>
                )
            })}
            <TeamDetailPanel height="60vh" destroyOnClose visible={!!teamId} onClose={() => setTeamId("")} teamId={teamId} />
        </Card>
    )

}

export default TeamRank;