import React from 'react';

import { Col, Divider, Row, Space, Tabs } from 'antd';

import styles from './index.module.scss';
import UserLine from '../UserLine';

import Button from '../Button';
import Avatar from '../Avatar';
import { UserAddOutlined } from '@ant-design/icons';

const SearchUser = () => {
    return (
        <div className={styles.searchUser}>
            <div className={styles.userDetail}>
                <div className={styles.avatar}><Avatar src="123" /></div>
                <Space direction="vertical">
                    <div className={styles.name}>孟浩 <span>未注册</span></div>
                    {/* <div className={styles.name}>孟浩 <span>未注册|未参加|3.5KM</span></div> */}
                    <div className={styles.edu}>
                        <Space>
                            <span>1998年入学</span>
                            <span>会计学院</span>
                        </Space>
                    </div>
                </Space>
            </div>
            <Button theme="success" icon={<UserAddOutlined />}>关注</Button>
        </div>
    )
}


const Search = () => {

    return (
        <div>
            {/* <Row gutter={12}>
                <Col flex={1}><input className={styles.searchInput} type="text" /></Col>
                <Col><Button>搜索</Button></Col>
            </Row> */}

            <div className={styles.searchList}>
                <div className={styles.searchItem}>
                    <SearchUser />
                </div>
                <div className={styles.searchItem}>
                    <SearchUser />
                </div>
                <div className={styles.searchItem}>
                    <SearchUser />
                </div>
                <div className={styles.searchItem}>
                    <SearchUser />
                </div>
                <div className={styles.searchItem}>
                    <SearchUser />
                </div>
                <div className={styles.searchItem}>
                    <SearchUser />
                </div>
            </div>
        </div>
    )

}

export default Search;