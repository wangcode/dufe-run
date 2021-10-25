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
  length: string;
  single?: boolean;
}

export const TeamRankItem: React.FC<TeamRankItemProps> = (props) => {

  return (
    <Row className={classNames({ [styles.single]: props.single })} align="middle">
      <Col className={styles.rank} span={4}>{props.rank}</Col>
      <Col className={styles.name} span={11}>{props.name}</Col>
      <Col className={`${styles.people}`} span={5}>{props.people}人</Col>
      <Col className={styles.length} span={4}>{props.length}</Col>
    </Row>
  )
}
