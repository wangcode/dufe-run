import React from 'react';
// import { useMutation } from 'react-query';

// import { removeStepUp, StepUpSomeOne } from 'services';
import { Col, Row } from 'antd';

import Avatar from 'components/Base/Avatar';
import { FollowTeamOrUserButton } from 'components/FollowButton';

import MapIcon from 'assets/images/map_circle_icon.png';
// import FavIcon from 'assets/images/fav_map_circle_icon.png';


import styles from './index.module.scss';

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
    follow: boolean;
    followId?: number;
  };
  type: "team" | "person";
  onFav?: () => void;
  onAvatarClick?: () => void;
  onMapClick?: () => void;
}

const TeamUserLine: React.FC<TeamUserLineProps> = (props) => {

  return (
    <div
      className={styles.userItem}
    >
      {props.rank && <div className={styles.rank}>
        <span className={styles.ranktext}>{props.rank}</span>
      </div>}
      <Row gutter={10} wrap={false} className={styles.detail} align="middle" justify="space-between">

        <Col onClick={props.onAvatarClick}>
          <Row gutter={10} wrap={false} align="middle">
            {props.avatar !== undefined && <Col className={styles.avatar}><Avatar text="Wang" /></Col>}
            {props.name && <Col className={styles.name}>{props.name}</Col>}
          </Row>
        </Col>

        {props.number && <Col className={styles.number}>{props.number}</Col>}

        {props.customRight ? props.customRight : <Col style={{ visibility: props.hidden === true ? "hidden" : "visible" }}>
          <Row gutter={10} wrap={false} align="middle">
            {!props.hiddenMap && <Col onClick={props.onMapClick} className={styles.mapIcon}><img src={MapIcon} alt="mapBtn" /></Col>}
            <Col className={styles.iconBtn}>
              <FollowTeamOrUserButton
                type={props.type}
                size="small"
                id={props.id}
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
