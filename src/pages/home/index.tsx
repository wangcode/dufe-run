import React from 'react';
import { RightOutlined } from '@ant-design/icons';
import { RankUser } from '../rank';
import styles from './index.module.scss';

import EntryPNG from '../../assets/images/entry.png';

const Home = () => {

    // const history = useHistory()

    

    return (
        <div>

            <div className={styles.buttons}>
                <div className={styles.button}>我的排名</div>
                <div className={styles.button}>攻略</div>
            </div>
            
            <div>
                <div>今日步数</div>
                <div>3688</div>
            </div>

            <div className={styles.entry}>
                <div className={styles.position}>
                    <div className={styles.total}>共 12112 校友参与</div>
                    <div className={styles.startBtn}>走路线</div>
                </div>
                <img src={EntryPNG} alt="entry" />
            </div>

            <div className={styles.rankPanel}>
                <div className={styles.rankButton} onClick={() => alert(123)}>
                    <span>今日排行榜</span>
                    <RightOutlined />
                </div>
                <div className={styles.rankPanelContent}>
                    <div className={styles.rankItem}>
                        <RankUser />
                    </div>
                    <div className={styles.rankItem}>
                        <RankUser />
                    </div>
                    <div className={styles.rankItem}>
                        <RankUser />
                    </div>
                </div>
            </div>

        </div>
    ) 
}

export default Home;