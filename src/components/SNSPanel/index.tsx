import React, { useEffect, useState } from 'react';

import { Col, DrawerProps, Row, Tabs } from 'antd';

import styles from './index.module.scss';
import Rank from './rank';
import Search from './search';
import DrawerPanel from '../DrawerPanel';
import Button from '../Button';
import { useQuery } from 'react-query';
import { getPeopleInStep } from '../../services';

const bodyStyle = {
    paddingTop:0,
    paddingBottom:0
}

interface SNSPanelProps extends DrawerProps {
}

const SNSPanel: React.FC<SNSPanelProps> = ( props ) => {

    const [active, setActive] = useState<string>("follow")

    const [searchValue, setSearchValue] = useState("")
    const [searchKey, setSearchKey] = useState("")

    const [ search, setSearch ] = useState(false)

    console.log(searchKey)

    const { data, isLoading, isFetching, refetch } = useQuery(["search", searchKey], () => getPeopleInStep(searchKey), {
        enabled: searchKey!=="",
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
            bodyStyle={bodyStyle}
            destroyOnClose
            title={
                <Tabs className={styles.tabs} centered activeKey={active} onChange={setActive}>
                    <Tabs.TabPane tab="我的关注" key="follow" />
                    <Tabs.TabPane tab="搜索校友" key="search">
                        <Row className={styles.searchHeader} gutter={12}>
                            <Col flex={1}><input value={searchValue} onChange={e => setSearchValue(e.target.value)} className={styles.searchInput} type="text" /></Col>
                            <Col><Button onClick={() => setSearchKey(searchValue)} theme="hot">搜索</Button></Col>
                        </Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="排行榜" key="rank" />
                </Tabs>
            }
        >
            {active === "follow" && <Rank onClick={() => setActive("search")} />}
            {active === "search" && <Search reSearch={refetch} loading={isLoading||isFetching} searchKey={searchKey} users={data||[]} />}
            {active === "rank" && <Rank onClick={() => setActive("search")} />}
        </DrawerPanel>
    )

}

export default SNSPanel;