import { useMemo, useState } from 'react';
import { Col, Row } from 'antd';
import { useHistory } from 'react-router';
import { useQuery } from 'react-query';

import Map from 'components/Map';
import Card from 'components/Base/Card';
import GraphRank from 'components/GraphRank';
import StepPoint from 'components/Map/stepPoint';
import TeamPopup from 'components/Popups/TeamPopup';
import TeamRunBar from 'components/RunBar/TeamRunBar';
import { TeamRankItem } from 'components/LineItem/TeamRank';
import TeamDetailPanel from 'components/Panels/TeamDetailPanel';
import UserDetailPanel from 'components/Panels/UserDetailPanelV2';
import { AvatarBox, GetPointButton, ToggleButton } from 'components/FloatComponents';

import { getAllStepTeam, getCumIntegral, getMySteps, getMyStepTeam, getSomeoneStep } from 'services';

import styles from './index.module.scss';

const Team = () => {

  const history = useHistory()

  const [userId, setUserId] = useState("")
  const [teamId, setTeamId] = useState("")

  const [popup, setPopup] = useState(true)

  const mySteps = useQuery(["mySteps"], getMySteps)
  const teams = useQuery(["teams"], getAllStepTeam)
  const myTeam = useQuery(["teams", mySteps.data?.teamId], () => getMyStepTeam(mySteps.data?.teamId!), { enabled: !!mySteps.data?.teamId })
  const selectUser = useQuery(["teams", "users", userId], () => getSomeoneStep(userId), { enabled: !!userId })
  const points = useQuery("points", getCumIntegral, { enabled: !userId })
  
  const hasPoint = useMemo(() => {
    return points.data?.some(item => item.flag === "1") || false
  }, [points.data])

  return (
    <div className={styles.root}>

      <div className={styles.topToolbar}>
        <Row justify='space-between' align="middle">
          <Col>
            <Row align="middle" gutter={10}>
              <Col><AvatarBox shadow avatar={mySteps.data?.pic} score={`${mySteps.data?.allPoint||0} 分`} /></Col>
              <Col><GetPointButton shadow dot={hasPoint} /></Col>
            </Row>
          </Col>
          <Col><ToggleButton shadow value="team" onChange={() => history.push("/person")} /></Col>
        </Row>
      </div>

      <div style={{ display: !!userId ? "none" : "block" }} className={styles.main}>
        <GraphRank list={teams.data} onClick={teamId => setTeamId(teamId.toString())} />

        {myTeam.data && <div className={styles.myTeam}>
          <TeamRankItem single rank={myTeam.data.allRank} name={myTeam.data.name} people={myTeam.data.personNum} length={`${myTeam.data.aveKm || "0"}KM`} />
        </div>}

        <div>
          <Card title="战队排行榜">
            {teams.data?.map((item, index) => {
              return (
                <div className={styles.teamListItem} onClick={() => setTeamId(item.id.toString())}>
                  <TeamRankItem rank={index + 1} name={item.name} people={item.personNum || 0} length={`${item.aveKm || 0}KM`} />
                </div>
              )
            })}
          </Card>
        </div>
      </div>

      {!!userId && <div>
        <Map>
          {selectUser.data && <StepPoint step={selectUser.data.allStep} center />}
        </Map>
      </div>}

      <UserDetailPanel
        visible={!!userId}
        userId={userId}
        height="50vh"
        onClose={() => setUserId("")}
        destroyOnClose
        haveProp
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
        <TeamRunBar onUserClick={setUserId} hideDrawer={!!userId} />
      </div>

      <TeamPopup visible={popup} onClose={() => setPopup(false)} />

    </div>
  )
}

export default Team;
