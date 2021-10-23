
import TeamRank, { TeamRankItem } from 'components/TeamRank';
import GraphRank from 'components/GraphRank';
import RunToolBar from 'pages/map/components/runToolBar';
import SelfToolBar from 'pages/map/components/userToolBar';

import styles from './index.module.scss';

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
                    <TeamRankItem single rank={15} name="上海战队" people={221} length={1.5} />
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