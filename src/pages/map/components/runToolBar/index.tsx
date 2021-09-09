import { CloseCircleOutlined, HeartFilled } from '@ant-design/icons';
import { Divider, Drawer, Progress } from 'antd';
import React, { CSSProperties, useState } from 'react';

import LogoPNG from '../../../../assets/images/logo.png';
import DrawerPanel from '../../../../components/DrawerPanel';
import Button from '../../../../components/Button';
import Avatar from '../../../../components/Avatar';

import styles from './index.module.scss';


const RunToolBar = () => {

    const [ visible, setVisible ] = useState(true)

    const handleOnGoClicl = () => {
        setVisible(true)
    }

    return (
        <div className={styles.toolbar}>
            <div className={styles.line}>
                <div className={styles.detail}>
                    <img src={LogoPNG} alt="logo" />
                    <div>全程 20 公里</div>
                </div>
                <div className={styles.followBtn}>我的关注</div>
            </div>
            <div className={styles.position}>
                <div className={styles.startBtn} onClick={handleOnGoClicl}>GO</div>
            </div>
            <DrawerPanel visible={visible} onClose={() => setVisible(false)}>
                {/* <div>
                    <div className={styles.rule}>
                        <div>可获得 <span>50 积分</span>，<span>5 个宝箱</span>。</div>
                        <div>同行好友越多，到达终点奖励越丰厚</div>
                    </div>
                    <Divider />
                    <div className={styles.progress}>
                        <div className={styles.total}>全程：<strong>20<em>KM</em></strong></div>
                        <div className={styles.surplus}>还差18.3km到达终点</div>
                    </div>
                    <Progress strokeColor={{from: "#c216fb", to: "#1244A8"}} percent={35} showInfo={false} />
                </div> */}
                <div>

                    <div>
                        <Avatar src="https://images.generated.photos/TLpLhkWOu0ROL4_KZsXodUeOYwWXS8evz3jO8KS40ds/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTY2NjgyLmpwZw.jpg" />
                    </div>

                    <div className={styles.progress}>
                        <div className={styles.total}>孟浩</div>
                        <div className={styles.surplus}>获得积分：356</div>
                    </div>
                    <Divider style={{margin: "15px 0"}} />
                    <div className={styles.progress}>
                        <div className={styles.total}>今日步数：<strong>16364</strong></div>
                    </div>
                    <div className={styles.progress}>
                        <div className={styles.total}>已走路程：<strong>15<em>KM</em></strong></div>
                    </div>
                    <div>
                        <Button>查看</Button>
                        <Button theme="success" icon={<HeartFilled />}>关注</Button>
                    </div>
                </div>
            </DrawerPanel>
        </div>
    )

}

export default RunToolBar;