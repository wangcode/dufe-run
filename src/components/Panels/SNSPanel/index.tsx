import React, { useEffect, useState } from 'react';
import { Col, DrawerProps, message, Row, Tabs } from 'antd';
import { useQuery } from 'react-query';
import { getPeopleInStep } from 'services';

import DrawerPanel from 'components/Base/DrawerPanel';
import Button from 'components/Base/Button';
import Search from './search';
import RankList from './rank';
import MyFollowPerson from './follow';

import styles from './index.module.scss';

const bodyStyle = {
  paddingTop: 0,
  paddingBottom: 0
}

interface SNSPanelProps extends DrawerProps {
  onUserClick?: (id: string) => void;
}

const SNSPanel: React.FC<SNSPanelProps> = (props) => {

  const [active, setActive] = useState<string>("follow")

  const [searchValue, setSearchValue] = useState("")
  const [searchKey, setSearchKey] = useState("")

  // const [, setSearch] = useState(false)

  const { data, isLoading, isFetching, refetch } = useQuery(["search", searchKey], () => getPeopleInStep(searchKey), {
    enabled: searchKey !== "",
    // onSuccess: () => setSearch(false)
  })

  const reset = () => {
    setActive("follow")
    setSearchKey("")
    setSearchValue("")
  }

  useEffect(() => {
    return reset
  }, [props.visible])

  const handleOnSearch = () => {
    if (searchValue === "" && searchKey === "") {
      message.info("请输入要搜索的名字！")
    } else {
      setSearchKey(searchValue)
    }
  }

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
              <Col span={16}><input value={searchValue} onChange={e => setSearchValue(e.target.value)} className={styles.searchInput} type="text" /></Col>
              <Col span={8}><Button onClick={handleOnSearch} theme="hot">搜索</Button></Col>
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="排行榜" key="rank" />
        </Tabs>
      }
    >
      {active === "follow" && <MyFollowPerson onClick={() => setActive("search")} onUserClick={props.onUserClick} />}
      {active === "search" && <Search reSearch={refetch} loading={isLoading || isFetching} searchKey={searchKey} users={data || []} />}
      {active === "rank" && <RankList onClick={props.onUserClick} />}
    </DrawerPanel>
  )

}

export default SNSPanel;
