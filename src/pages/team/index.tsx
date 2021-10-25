import { useState } from 'react';
import { Col, Row } from 'antd';
import { useHistory } from 'react-router';

import RunToolBar from 'pages/map/components/runToolBar';

import Card from 'components/Base/Card';
import GraphRank from 'components/GraphRank';
import { TeamRankItem } from 'components/TeamRank';
import TeamDetailPanel from 'components/Panels/TeamDetailPanel';
import UserDetailPanel from 'components/Panels/UserDetailPanelV2';
import { AvatarBox, GetPointButton, ToggleButton } from 'components/FloatComponents';
import Map from 'components/Map';

import styles from './index.module.scss';
import MapRoute from 'components/Map/route';
import { useQuery } from 'react-query';
import { getAllStepTeam, getMySteps, getMyStepTeam } from 'services';

const Team = () => {

  const history = useHistory()

  const [userId, setUserId] = useState("")
  const [teamId, setTeamId] = useState("")

  const mySteps = useQuery(["mySteps"], getMySteps)
  const teams = useQuery(["teams"], getAllStepTeam)

  const myTeam = useQuery(["teams", mySteps.data?.teamId], () => getMyStepTeam(mySteps.data?.teamId!), { enabled: !!mySteps.data?.teamId })

  // const MyTeam = useMemo(() => {
  //   if (!mySteps.data || !teams.data) return undefined
  //   const index = teams.data.findIndex(team => team.id === parseInt(mySteps.data.teamId))
  //   if (index === -1) return undefined
  //   console.log(index)
  //   return {
  //     rank: index,
  //     team: teams.data[index]
  //   }
  // }, [mySteps.data, teams.data])

  return (
    <div className={styles.root}>

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

      <div style={{ display: !!userId ? "none" : "block" }} className={styles.main}>
        <GraphRank />

        {myTeam.data && <div className={styles.myTeam}>
          <TeamRankItem single rank={myTeam.data.allRank} name={myTeam.data.name} people={myTeam.data.personNum} length={`${myTeam.data.aveKm}KM`} />
        </div>}

        <div>
          <Card title="战队排行榜">
            {teams.data?.map((item, index) => {
              return (
                <div className={styles.teamListItem} onClick={() => setTeamId(item.id.toString())}>
                  <TeamRankItem rank={index + 1} name={item.name} people={item.personNum} length={`${item.aveKm}KM`} />
                </div>
              )
            })}
          </Card>
        </div>
      </div>

      <div style={{ display: !!userId ? "block" : "none" }}>
        <Map>
          <MapRoute myStep={"222"} />
        </Map>
      </div>

      <UserDetailPanel
        visible={!!userId}
        userId={userId}
        height="50vh"
        onClose={() => setUserId("")}
        destroyOnClose
      />
      <TeamDetailPanel
        type="show"
        onUserClick={setUserId}
        height="60vh"
        destroyOnClose
        visible={!!teamId && !userId}
        onClose={() => setTeamId("")}
        teamId={teamId}
      />

      <div className={styles.runToolBar}>
        <RunToolBar mode="team" onTeamUserClick={setUserId} hideDrawer={!!userId} />
      </div>

    </div>
  )
}

export default Team;
