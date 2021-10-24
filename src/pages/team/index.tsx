import { useState } from 'react';
import { Col, Modal, Row } from 'antd';
import { useHistory } from 'react-router';

import RunToolBar from 'pages/map/components/runToolBar';

import Card from 'components/Base/Card';
import GraphRank from 'components/GraphRank';
import { TeamRankItem } from 'components/TeamRank';
import TeamDetailPanel from 'components/Panels/TeamDetailPanel';
import UserDetailPanel from 'components/Panels/UserDetailPanelV2';
import { AvatarBox, GetPointButton, ToggleButton } from 'components/FloatComponents';

import styles from './index.module.scss';
import PropsModal from 'components/PropsModal';

const Team = () => {

    const history = useHistory()

    const [userId, setUserId] = useState("")
    const [teamId, setTeamId] = useState("")


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
                    <Col><ToggleButton shadow value="team" onChange={() => history.push("/person")} /></Col>
                </Row>
            </div>

            {userId==="" && <div className={styles.main}>
                <GraphRank />

                <div className={styles.myTeam}>
                    <TeamRankItem single rank={15} name="上海战队" people={221} length={1.5} />
                </div>

                <div>
                    <Card title="战队排行榜">
                        {[1, 2, 3, 4].map(item => {
                            return (
                                <div className={styles.teamListItem} onClick={() => setTeamId(item.toFixed(0))}>
                                    <TeamRankItem rank={item} name={`战队 - ${item}`} people={item * 11} length={item} />
                                </div>
                            )
                        })}
                    </Card>
                </div>

            </div>}

            <UserDetailPanel
                visible={!!userId}
                userId={userId}
                height="50vh"
                onClose={() => setUserId("")}
                destroyOnClose
            />
            <TeamDetailPanel
                onUserClick={setUserId}
                height="60vh"
                destroyOnClose
                visible={!!teamId && !userId}
                onClose={() => setTeamId("")}
                teamId={teamId}
            />

            <div className={styles.runToolBar}>
                <RunToolBar mode="team" />
            </div>

        </div>
    )
}

export default Team;