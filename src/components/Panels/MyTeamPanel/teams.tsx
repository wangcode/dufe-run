import TeamUserLine from "components/User/TeamUserLine";

import FlagIcon from 'assets/images/flag_icon.png';

import styles from './index.module.scss';
import { useQuery } from "react-query";
import { getAllStepTeam } from "services";

interface TeamsProps {
    rank: number;
    name: string;
    number: string;
}

const Teams: React.FC<TeamsProps> = (props) => {

    const { data } = useQuery(
        ["teams"],
        getAllStepTeam
    )

    return (
        <div>

            <div className={styles.subTitle}>
                <img src={FlagIcon} alt="flag" />
                <div>共计 {data?.length} 个战队</div>
            </div>

            <div className={`${styles.lineItem} ${styles.myTeam}`}>
                <TeamUserLine hidden={true} rank={props.rank} name={props.name} number={props.number} />
            </div>

            <div>
                {data?.map((team, index) => (
                    <div key={team.id} className={styles.lineItem}>
                        <TeamUserLine rank={index+1} name={team.name} number={`${team.aveKm}KM`} />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Teams