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

    const [searchKey, setSearchKey] = useState("")

    const { data } = useQuery(["search", searchKey], () => getPeopleInStep(searchKey))

    const reset = () => {
        setActive("follow")
        setSearchKey("")
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
                            <Col flex={1}><input value={searchKey} onChange={e => setSearchKey(e.target.value)} className={styles.searchInput} type="text" /></Col>
                            <Col><Button theme="hot">搜索</Button></Col>
                        </Row>
                    </Tabs.TabPane>
                </Tabs>
            }
        >
            {active === "follow" && <Rank />}
            {active === "search" && <Search users={data||[]} />}
        </DrawerPanel>
    )

}

export default SNSPanel;