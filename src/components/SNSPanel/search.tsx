import React from 'react';

import { UserAddOutlined } from '@ant-design/icons';
import { Col, Divider, Row, Space, Tabs } from 'antd';

import styles from './index.module.scss';
import UserLine from '../UserLine';

import Button from '../Button';
import Avatar from '../Avatar';

export interface SearchUserPorps {
    pic: string;
    name: string;
    joinFlag: "0"|"1";
    followFlag: "0"|"1";
    allStep: string;
    userId: string;
    allRank: string;
}

const SearchUser: React.FC<SearchUserPorps> = ({ pic, name, joinFlag, followFlag, allStep, allRank }) => {
    return (
        <div className={styles.searchUser}>
            <div className={styles.userDetail}>
                <div className={styles.avatar}><Avatar src={pic} /></div>
                <Space direction="vertical">
                    <div className={styles.name}>
                        {name} <span>{joinFlag?allStep:"未参加"}</span>
                    </div>
                    {/* <div className={styles.name}>孟浩 <span>未注册|未参加|3.5KM</span></div> */}
                    <div className={styles.edu}>
                        第{allRank}名
                        {/* <Space>
                            <span>1998年入学</span>
                            <span>会计学院</span>
                        </Space> */}
                    </div>
                </Space>
            </div>
            <Button theme="success" icon={<UserAddOutlined />}>关注</Button>
        </div>
    )
}


interface SearchProps {
    users: SearchUserPorps[]
}

const Search: React.FC<SearchProps> = ({ users }) => {

    return (
        <div className={styles.searchList}>
            {users.map(item => (
                <div key={item.userId} className={styles.searchItem}>
                    <SearchUser {...item} />
                </div>
            ))}
            {/* <div className={styles.searchItem}>
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
            </div> */}
        </div>
    )

}

export default Search;