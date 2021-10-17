import React, { useState } from 'react';

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
import Card from '../../components/Card';
import { transStep2Metre } from '../../utils';
import UserPanel from '../../components/UserLine/components/userPanel';
import RunToolBar from '../map/components/runToolBar';

import GoldLogo from '../../assets/images/gold_logo.png';
import GoldBar from '../../assets/images/gold_bar.png';
import SilverLogo from '../../assets/images/silver_logo.png';
import SilverBar from '../../assets/images/silver_bar.png';
import BronzeLogo from '../../assets/images/bronze_logo.png';
import BronzeBar from '../../assets/images/bronze_bar.png';
import SelfToolBar from '../map/components/userToolBar';
import TeamRank, { TeamRankItem } from '../../components/TeamRank';
import GraphRank from '../../components/GraphRank';

const Team = () => {


    return (
        <div>

            <div className={styles.topToolbar}>
                <SelfToolBar />
            </div>

            <div>
                <GraphRank />
            </div>

            <div className={styles.main}>

                <div className={styles.myTeam}>
                    <TeamRankItem single rank={15} name="上海战队" people={221} length={1.5}  />
                </div>

                <div>
                    <TeamRank />
                </div>

            </div>

            <div className={styles.runToolBar}>
                <RunToolBar mode="team" />
            </div>


        </div>
    )
}

export default Team;