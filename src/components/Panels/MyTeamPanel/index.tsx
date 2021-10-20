import { Row, Col, DrawerProps, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { getPeopleInStep } from 'services';

import DrawerPanel from 'components/Base/DrawerPanel';
import Button from 'components/Base/Button';

import styles from './index.module.scss';

interface MyTeamPanelProps extends DrawerProps {

}

type activeKey = "MyTeammates" | "allTeam" | "follow"

const MyTeamPanel: React.FC<MyTeamPanelProps> = (props) => {

    const [active, setActive] = useState<activeKey>("MyTeammates")

    const [searchValue, setSearchValue] = useState("")
    const [searchKey, setSearchKey] = useState("")

    const [search, setSearch] = useState(false)

    console.log(searchKey)

    const { data, isLoading, isFetching, refetch } = useQuery(["search", searchKey], () => getPeopleInStep(searchKey), {
        enabled: searchKey !== "",
        onSuccess: () => setSearch(false)
    })

    const reset = () => {
        setActive("follow")
        setSearchKey("")
        setSearchValue("")
    }

    useEffect(() => {
        return reset
    }, [props.visible])

    return (
        <DrawerPanel
            {...props}
            // bodyStyle={bodyStyle}
            destroyOnClose
            title={
                <Tabs className={styles.tabs} activeKey={active} onChange={e => setActive(e as activeKey)}>
                    <Tabs.TabPane tab="我的队友" key="MyTeammates" >
                        <Row className={styles.searchHeader} gutter={12}>
                            <Col flex={1}><input value={searchValue} onChange={e => setSearchValue(e.target.value)} className={styles.searchInput} type="text" /></Col>
                            <Col><Button onClick={() => setSearchKey(searchValue)} theme="hot">搜索</Button></Col>
                        </Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="全部战队" key="allTeam" />
                    <Tabs.TabPane tab="关注" key="follow" />
                </Tabs>
            }
        >
            {active === "MyTeammates" && <div>MyTeammates</div>}
            {active === "allTeam" && <div>allTeam</div>}
            {active === "follow" && <div>follow</div>}
        </DrawerPanel>
    )

}

export default MyTeamPanel;