import React, { useEffect, useState } from 'react';

import { Col, DrawerProps, Row, Tabs } from 'antd';

import styles from './index.module.scss';
import Rank from './rank';
import Search from './search';
import DrawerPanel from '../DrawerPanel';
import Button from '../Button';

const bodyStyle = {
    paddingTop:0,
    paddingBottom:0
}

interface SNSPanelProps extends DrawerProps {
}

const SNSPanel: React.FC<SNSPanelProps> = ( props ) => {

    const [active, setActive] = useState<string>("follow")

    useEffect(() => {
        return () => setActive("follow")
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
                            <Col flex={1}><input className={styles.searchInput} type="text" /></Col>
                            <Col><Button theme="hot">搜索</Button></Col>
                        </Row>
                    </Tabs.TabPane>
                </Tabs>
            }
        >
            {active === "follow" && <Rank />}
            {active === "search" && <Search />}
        </DrawerPanel>
    )

}

export default SNSPanel;