import React from 'react';
import { RightOutlined } from '@ant-design/icons';

import Dialog from 'rc-dialog';

import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';


import EntryPNG from '../../assets/images/entry.png';
import UserLine from '../../components/UserLine';

import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';
import { RankList } from '../rank';
import { useQuery } from 'react-query';
import { getStepNum } from '../../services';

const Home = () => {

    const history = useHistory()

    const { data } = useQuery(["total", "people"], getStepNum)

    const value = 60;

    const steps = 304;

    return (
        <div>

            <div className={styles.buttons}>
                <div className={styles.button} onClick={() => history.push("/rank")}>我的排名</div>
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
                <div>{steps}</div>
            </div>

            <div className={styles.entry}>
                <div className={styles.position}>
                    <div className={styles.total}>共 {data?.num} 校友参与</div>
                    <div className={styles.startBtn} onClick={() => history.push("/map")}>走路线</div>
                </div>
                <img src={EntryPNG} alt="entry" />
            </div>

            <RankList title />

            <Dialog mask title={123} visible={true}>
                123
            </Dialog>

        </div>
    )
}

export default Home;