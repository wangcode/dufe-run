
import TeamRank, { TeamRankItem } from 'components/TeamRank';
import GraphRank from 'components/GraphRank';
import RunToolBar from 'pages/map/components/runToolBar';

import styles from './index.module.scss';
import { Col, Row } from 'antd';
import { AvatarBox, GetPointButton, ToggleButton } from 'components/FloatComponents';
import { useHistory } from 'react-router';

const Team = () => {

    const history = useHistory()


    return (
        <div>

            <div className={styles.topToolbar}>
                <Row justify='space-between' align="middle">
                    <Col>
                        <Row align="middle" gutter={10}>
                            <Col><AvatarBox shadow avatar="123" score="123分" /></Col>
                            <Col><GetPointButton shadow /></Col>
                        </Row>
                    </Col>
                    <Col><ToggleButton shadow value="team" onChange={() => history.push("/map")} /></Col>
                </Row>
            </div>

            <div>
                <GraphRank />
            </div>

            <div className={styles.main}>

                <div className={styles.myTeam}>
                    <TeamRankItem single rank={15} name="上海战队" people={221} length={1.5} />
                </div>

                <div>
                    <TeamRank />
                </div>

            </div>

            <div className={styles.runToolBar}>
                <RunToolBar mode="team" />
            </div>

        </div>
    )
}

export default Team;