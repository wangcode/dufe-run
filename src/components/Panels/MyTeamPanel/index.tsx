import { DrawerProps, Tabs } from 'antd';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { getMySteps } from 'services';

import DrawerPanel from 'components/Base/DrawerPanel';

import Teammates from './teammates';
import Teams from './teams';
import Follows from './follows';

import tabStyles from 'components/Base/Tabs/index.module.scss';
import styles from './index.module.scss';

interface MyTeamPanelProps extends DrawerProps {
}

type MyTeamActiveKeys = "MyTeammates" | "allTeam" | "follow"

const MyTeamPanel: React.FC<MyTeamPanelProps> = (props) => {

    const [active, setActive] = useState<MyTeamActiveKeys>("MyTeammates")

    const { data } = useQuery(
        ["mySteps"],
        getMySteps
    )

    return (
        <DrawerPanel
            {...props}
            bodyStyle={{padding: "0px 9px"}}
            destroyOnClose
            title={
                <Tabs centered className={tabStyles.tabs} activeKey={active} onChange={e => setActive(e as MyTeamActiveKeys)}>
                    <Tabs.TabPane tab="我的队友" key="MyTeammates" />
                    <Tabs.TabPane tab="全部战队" key="allTeam" />
                    <Tabs.TabPane tab="关注" key="follow" />
                </Tabs>
            }
        >
            {active === "MyTeammates" && <Teammates teamId={data?.teamId||""} />}
            {active === "allTeam" && <Teams rank={11} name={data?.teamName||""} number={`${data?.aveTeamKm}KM`}  />}
            {active === "follow" && <Follows />}
        </DrawerPanel>
    )

}

export default MyTeamPanel;