import React, { useState } from 'react';
import { useMutation } from 'react-query';

import { removeStepUp, StepUpSomeOne } from 'services';
import { Col, Row } from 'antd';

import Avatar from 'components/Base/Avatar';

import MapIcon from 'assets/images/map_circle_icon.png';
import FavIcon from 'assets/images/fav_map_circle_icon.png';


import styles from './index.module.scss';

interface TeamUserLineProps {

}

const TeamUserLine: React.FC<TeamUserLineProps> = () => {

    // const [visible, setVisible] = useState(false)

    // const { mutate } = useMutation(() => like?.isLike ? removeStepUp(like.likeId) : StepUpSomeOne(userId), {
    //     onSuccess: like?.onChange
    // })

    return (
        <div className={styles.userItem}>
            <Row align="middle" justify="space-between">

                <Col>
                    <Row align="middle">
                        <Col className={styles.rank}><div>1</div></Col>
                        <Col className={styles.avatar}><Avatar text="Wang" /></Col>
                        <Col className={styles.name}>孟浩</Col>
                    </Row>
                </Col>

                <Col>
                    <Row align="middle">
                        <Col className={styles.number}>3.5KM</Col>
                        <Col className={styles.mapIcon}><img src={MapIcon} alt="mapBtn" /></Col>
                        <Col className={styles.iconBtn}><img src={FavIcon} alt="FavBtn" /></Col>
                    </Row>
                </Col>

            </Row>
        </div>
    )
}

export default TeamUserLine;