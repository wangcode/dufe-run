import React from 'react';
import { RightOutlined } from '@ant-design/icons';

import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import { RankUser } from '../rank';
import styles from './index.module.scss';

import EntryPNG from '../../assets/images/entry.png';

const Home = () => {

    // const history = useHistory()

    const value = 60;

    return (
        <div>

            <div className={styles.buttons}>
                <div className={styles.button}>我的排名</div>
                <div className={styles.button}>攻略</div>
            </div>
            
            <div className={styles.progress}>

                <CircularProgressbar
                    value={value}
                    circleRatio={0.3}
                    strokeWidth={6}
                    text={value.toString()}
                    counterClockwise
                    styles={buildStyles({
                        rotation: 0.65,
                        // textSize: "36px",
                        textColor: "#333",
                        pathColor: `rgba(129, 021, 252, ${value / 100})`,
                        trailColor: "#B9B9CD"
                        // backgroundColor: "#B9B9CD"
                    })}
                />

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