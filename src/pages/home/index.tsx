import React, { useState } from 'react';

import Dialog from 'rc-dialog';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import { useHistory } from 'react-router-dom';
import { RankList } from '../rank';
import { useQuery } from 'react-query';
import { getMySteps, getStepNum } from '../../services';

import EntryPNG from '../../assets/images/entry.png';
import styles from './index.module.scss';
import StartModal from '../../components/StartModal';

const Home = () => {

    const history = useHistory()

    const [ visible, setVisible ] = useState(true);

    const { data: mySteps } = useQuery(["mySteps"], getMySteps)

    const { data } = useQuery(["total", "people"], getStepNum)

    const value = 60;

    return (
        <div>

            <div className={styles.buttons}>
                <div className={styles.rank} onClick={() => history.push("/rank")}>我的排名</div>
                <div className={styles.info}>攻略</div>
            </div>

            <div className={styles.progress}>

                <CircularProgressbar
                    className={styles.progressbar}
                    value={value}
                    circleRatio={0.3}
                    strokeWidth={5}
                    counterClockwise
                    styles={buildStyles({
                        rotation: 0.65,
                        // rgba(94, 113, 192)
                        pathColor: `rgba(129, 021, 252, ${value / 100})`,
                        trailColor: "#B9B9CD"
                    })}
                />
                <div className={styles.totalSteps}>{mySteps?.allStep}</div>
                <div className={styles.title}>今日步数</div>
                <div className={styles.value}>{mySteps?.nowStep}</div>
            </div>

            <div className={styles.entry}>
                <div className={styles.position}>
                    <div className={styles.total}>共 {data?.num} 校友参与</div>
                    <div className={styles.startBtn} onClick={() => history.push("/map")}>走路线</div>
                </div>
                <img src={EntryPNG} alt="entry" />
            </div>

            <RankList title />

            {visible && <StartModal onClose={() => setVisible(false)} />}

        </div>
    )
}

export default Home;