import React, { useState } from 'react';
import { useMutation } from 'react-query';

import { removeStepUp, StepUpSomeOne } from 'services';
import { Col, Row } from 'antd';

import Avatar from 'components/Base/Avatar';

import MapIcon from 'assets/images/map_circle_icon.png';
import FavIcon from 'assets/images/fav_map_circle_icon.png';


import styles from './index.module.scss';
import classNames from 'classnames';

interface TeamUserLineProps {
    avatar?: string;
    name?: string;
    number?: string;
    hidden?: boolean;
}

const TeamUserLine: React.FC<TeamUserLineProps> = (props) => {

    // const [visible, setVisible] = useState(false)

    // const { mutate } = useMutation(() => like?.isLike ? removeStepUp(like.likeId) : StepUpSomeOne(userId), {
    //     onSuccess: like?.onChange
    // })

    return (
        <div
            className={styles.userItem}
        >
            <div className={styles.rank}>1</div>
            <Row className={styles.detail} align="middle" justify="space-between">

                <Col>
                    <Row align="middle">
                        {/* <Col className={styles.rank}><div>1</div></Col> */}
                        {props.avatar && <Col className={styles.avatar}><Avatar text="Wang" /></Col>}
                        {props.name && <Col className={styles.name}>{props.name}</Col>}
                    </Row>
                </Col>

                {props.number && <Col className={styles.number}>{props.number}</Col>}

                <Col style={{visibility: props.hidden?"hidden":"visible"}}>
                    <Row align="middle">
                        <Col className={styles.mapIcon}><img src={MapIcon} alt="mapBtn" /></Col>
                        <Col className={styles.iconBtn}><img src={FavIcon} alt="FavBtn" /></Col>
                    </Row>
                </Col>

            </Row>
        </div>
    )
}

export default TeamUserLine;