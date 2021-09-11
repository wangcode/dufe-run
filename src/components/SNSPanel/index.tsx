import React, { useState } from 'react';

import { Col, Row, Tabs } from 'antd';

import styles from './index.module.scss';
import Rank from './rank';
import Search from './search';
import DrawerPanel from '../DrawerPanel';
import Button from '../Button';

const bodyStyle = {
    paddingTop:0,
    paddingBottom:0
}


const SNSPanel = () => {

    const [active, setActive] = useState("follow")

    return (
        <DrawerPanel
            bodyStyle={bodyStyle}
            destroyOnClose
            height="55vh"
            visible={true}
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