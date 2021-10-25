import React, { useState } from 'react';
import { useMutation } from 'react-query';

import { removeStepUp, StepUpSomeOne } from 'services';
import { Col, Row } from 'antd';

import Avatar from 'components/Base/Avatar';

import MapIcon from 'assets/images/map_circle_icon.png';
import FavIcon from 'assets/images/fav_map_circle_icon.png';


import styles from './index.module.scss';
import { FollowTeamUserButton } from 'components/FollowButton';

interface TeamUserLineProps {
  id: string;
  rank?: number;
  avatar?: string;
  name?: string;
  number?: string;
  hidden?: boolean;
  hiddenMap?: boolean;
  // hidden?: boolean;
  customRight?: React.ReactNode;
  follow?: {
    followId: string;
    follow: boolean;
  };
  onFav?: () => void;
  onAvatarClick?: () => void;
  onMapClick?: () => void;
}

const TeamUserLine: React.FC<TeamUserLineProps> = (props) => {

  return (
    <div
      className={styles.userItem}
    >
      <div className={styles.rank}>
        <span className={styles.ranktext}>{props.rank}</span>
      </div>
      <Row wrap={false} className={styles.detail} align="middle" justify="space-between">

        <Col onClick={props.onAvatarClick}>
          <Row wrap={false} align="middle">
            {props.avatar !== undefined && <Col className={styles.avatar}><Avatar text="Wang" /></Col>}
            {props.name && <Col className={styles.name}>{props.name}</Col>}
          </Row>
        </Col>

        {props.number && <Col className={styles.number}>{props.number}</Col>}

        {props.customRight ? props.customRight : <Col style={{ visibility: props.hidden === true ? "hidden" : "visible" }}>
          <Row wrap={false} align="middle">
            {!props.hiddenMap && <Col onClick={props.onMapClick} className={styles.mapIcon}><img src={MapIcon} alt="mapBtn" /></Col>}
            <Col className={styles.iconBtn}>
              <FollowTeamUserButton
                size="small"
                userId={props.id}
                follow={!!props.follow?.follow}
                followId={props.follow?.followId}
                onChange={props.onFav}
              />
            </Col>
          </Row>
        </Col>}

      </Row>
    </div>
  )
}

export default TeamUserLine;
