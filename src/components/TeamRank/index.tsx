import { Col, Row } from 'antd';
import classNames from 'classnames';
import React from 'react';
import Card from '../Card';

import styles from './index.module.scss';

interface TeamRankItemProps {
    rank: number;
    name: string;
    people: number;
    length: number;
    single?: boolean;
}

export const TeamRankItem: React.FC<TeamRankItemProps> = (props) => {

    return (
        <Row className={classNames({[styles.single]: props.single})} align="middle">
            <Col className={styles.rank} span={4}>15</Col>
            <Col className={styles.name} span={11}>{props.name}</Col>
            <Col className={`${styles.people}`} span={5}>{props.people}人</Col>
            <Col className={styles.length} span={4}>1.5KM</Col>
        </Row>
    )
}

const TeamRank = () => {

    return (
        <Card title="战队排行榜">
            {[1,2,3,4].map(item => {
                return <div className={styles.teamListItem}><TeamRankItem rank={item} name={`战队 - ${item}`} people={item * 11} length={item} /></div>
            })}
        </Card>
    )

}

export default TeamRank;