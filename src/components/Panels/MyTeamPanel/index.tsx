import { DrawerProps, Tabs } from 'antd';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { getMySteps } from 'services';

import DrawerPanel from 'components/Base/DrawerPanel';

import Teammates from './teammates';
import Teams from './teams';
import Follows from './follows';

import tabStyles from 'components/Base/Tabs/index.module.scss';
// import styles from './index.module.scss';
import TeamDetailPanel from '../TeamDetailPanel';

interface MyTeamPanelProps extends DrawerProps {
  onUserClick?: (id: string) => void;
  onTeamClick?: (id: string) => void;
}

type MyTeamActiveKeys = "MyTeammates" | "allTeam" | "follow"

const MyTeamPanel: React.FC<MyTeamPanelProps> = (props) => {

  const [active, setActive] = useState<MyTeamActiveKeys>("MyTeammates")
  const [teamId, setTeamId] = useState("")

  const mySteps = useQuery(
    ["mySteps"],
    getMySteps,
    { enabled: props.visible }
  )

  const handleOnclose = (e: any) => {
    setActive("MyTeammates")
    props.onClose?.(e)
  }

  return (
    <DrawerPanel
      {...props}
      bodyStyle={{ padding: "0px 9px" }}
      onClose={handleOnclose}
      destroyOnClose
      title={
        <Tabs centered className={tabStyles.tabs} activeKey={active} onChange={e => setActive(e as MyTeamActiveKeys)}>
          <Tabs.TabPane tab="我的队友" key="MyTeammates" />
          <Tabs.TabPane tab="全部战队" key="allTeam" />
          <Tabs.TabPane tab="关注" key="follow" />
        </Tabs>
      }
    >
      {active === "MyTeammates" && <Teammates onUserClick={props.onUserClick} teamId={mySteps.data?.teamId || "1"} />}
      {active === "allTeam" && <Teams onTeamClick={props.onTeamClick} teamId={mySteps.data?.teamId || "1"} />}
      {active === "follow" && <Follows onTeamClick={props.onTeamClick} onUserClick={props.onUserClick} teamId={mySteps.data?.teamId || '1'} />}

      <TeamDetailPanel
        type="show"
        onUserClick={props.onUserClick}
        height="60vh"
        destroyOnClose
        visible={!!teamId}
        onClose={() => setTeamId("")}
        teamId={teamId}
      />

    </DrawerPanel>
  )

}

export default MyTeamPanel;
