import { Row, Col, DrawerProps, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { getPeopleInStep } from 'services';

import DrawerPanel from 'components/Base/DrawerPanel';
import Button from 'components/Base/Button';

import Teammates from './teammates';
import Teams from './teams';
import Follows from './follows';

import styles from './index.module.scss';
import tabStyles from 'components/Base/Tabs/index.module.scss';

interface MyTeamPanelProps extends DrawerProps {

}

type MyTeamActiveKeys = "MyTeammates" | "allTeam" | "follow"

const MyTeamPanel: React.FC<MyTeamPanelProps> = (props) => {

    const [active, setActive] = useState<MyTeamActiveKeys>("MyTeammates")

    // const [searchValue, setSearchValue] = useState("")
    // const [searchKey, setSearchKey] = useState("")

    // const [search, setSearch] = useState(false)

    // const { data, isLoading, isFetching, refetch } = useQuery(["search", searchKey], () => getPeopleInStep(searchKey), {
    //     enabled: searchKey !== "",
    //     onSuccess: () => setSearch(false)
    // })

    // const reset = () => {
    //     setActive("follow")
    //     setSearchKey("")
    //     setSearchValue("")
    // }

    // useEffect(() => {
    //     return reset
    // }, [props.visible])

    return (
        <DrawerPanel
            {...props}
            // bodyStyle={tabStyles}
            destroyOnClose
            title={
                <Tabs className={tabStyles.tabs} activeKey={active} onChange={e => setActive(e as MyTeamActiveKeys)}>
                    <Tabs.TabPane tab="我的队友" key="MyTeammates" />
                    {/* <Row className={styles.searchHeader} gutter={12}>
                            <Col flex={1}><input value={searchValue} onChange={e => setSearchValue(e.target.value)} className={styles.searchInput} type="text" /></Col>
                            <Col><Button onClick={() => setSearchKey(searchValue)} theme="hot">搜索</Button></Col>
                        </Row>
                    </Tabs.TabPane> */}
                    <Tabs.TabPane tab="全部战队" key="allTeam" />
                    <Tabs.TabPane tab="关注" key="follow" />
                </Tabs>
            }
        >
            {active === "MyTeammates" && <Teammates />}
            {active === "allTeam" && <Teams />}
            {active === "follow" && <Follows />}
        </DrawerPanel>
    )

}

export default MyTeamPanel;