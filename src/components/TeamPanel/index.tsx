import { Col, Row } from 'antd';
import React from 'react';
import Button from '../Button';
import Card from '../Card';

import styles from './index.module.scss';


const TeamPanel = () => {

    return (
        <div>

            <div>
                <div>辽宁战队</div>
                <div>第1名</div>
            </div>


            <div>
                <div>
                    <div>战队人数</div>
                    <div>1213人</div>
                </div>
                <div>
                    <div>战队总路程</div>
                    <div>432.3km</div>
                </div>
                <div>
                    <div>战队人均路程</div>
                    <div>15.2km</div>
                </div>
            </div>

            <div>
                <div>战队介绍：</div>
                <div>
                    这里是介绍
                </div>
            </div>

            <div>
                <div>
                    <div>队员</div>
                    <div>全部</div>
                </div>
            </div>

            <Button>加入战队</Button>

        </div>
    )

}

export default TeamPanel;