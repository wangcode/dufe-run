import React, { useState } from 'react';
import { Progress } from 'antd';

import Dialog from 'rc-dialog';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import { useHistory } from 'react-router-dom';
import { RankList } from '../rank';
import { useQuery } from 'react-query';
import { getMySteps, getStepNum, TOTAL_STEPS } from '../../services';

// import EntryPNG from '../../assets/images/entry.png';
import PersonPNG from '../../assets/images/person.png';
import GroupPNG from '../../assets/images/group.png';
import styles from './index.module.scss';
import StartModal from '../../components/StartModal';
import { transStep2Metre } from '../../utils';

const Home = () => {

    const history = useHistory()

    const [ visible, setVisible ] = useState(true);

    const { data: mySteps } = useQuery(["mySteps"], getMySteps)

    const { data } = useQuery(["total", "people"], getStepNum)

    return (
        <div>

            <div className={styles.buttons}>
                <div className={styles.rank} onClick={() => history.push("/rank")}>我的排名</div>
                {/* <div className={styles.info}>攻略</div> */}
            </div>

            <div className={styles.progress}>
                <Progress
                    className={styles.progressbar}
                    type="dashboard"
                    gapDegree={210}
                    showInfo={false}
                    gapPosition="top"
                    strokeWidth={5}
                    width={255}
                    trailColor="#B9B9CD"
                    strokeColor={{from: "#5e71c0", to: "#8115fc"}}
                    percent={parseInt(mySteps?.allStep||"0") / TOTAL_STEPS}
                />
                <div className={styles.totalSteps}>{mySteps?.allStep}</div>
                <div className={styles.title}>今日步数</div>
                <div className={styles.value}>{mySteps?.nowStep||"0"}</div>
            </div>

            {/* <div className={styles.entry}>
                <div className={styles.position}>
                    <div className={styles.total}>共 {data?.num} 校友参与</div>
                    <div className={styles.startBtn} onClick={() => history.push("/map")}>走路线</div>
                </div>
                <img src={EntryPNG} alt="entry" />
            </div> */}

            <div className={styles.entry2}>
                <img src={PersonPNG} alt="entry" />
            </div>

            <div className={styles.entry2}>
                <img src={GroupPNG} alt="entry" />
            </div>

            <RankList title />

            {visible && <StartModal onClose={() => setVisible(false)} />}

        </div>
    )
}

export default Home;