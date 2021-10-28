import { useQuery } from "react-query";
import { getAllStepTeam, getMyStepTeam } from "services";

import TeamUserLine from "components/LineItem/TeamUserLine";

import FlagIcon from 'assets/images/flag_icon.png';

import styles from './index.module.scss';

interface TeamsProps {
  teamId?: string;
  onTeamClick?: (id: string) => void;
}

const Teams: React.FC<TeamsProps> = (props) => {

  const myTeam = useQuery(
    ["teams", props.teamId],
    () => getMyStepTeam(props.teamId!),
    { enabled: !!props.teamId }
  )

  const { data, refetch } = useQuery(
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
        <TeamUserLine id={"1"} hidden={true} rank={myTeam.data?.allRank} name={myTeam.data?.name} number={`${myTeam.data?.allKm}KM`} hiddenMap />
      </div>

      <div>
        {data?.map((team, index) => (
          <div key={team.id} className={styles.lineItem}>
            <TeamUserLine
              id={team.id.toString()}
              follow={{
                followId: team.followId,
                follow: team.flag === "1"
              }}
              onFav={refetch}
              onAvatarClick={() => props.onTeamClick?.(team.id.toString())}
              hiddenMap
              rank={index + 1}
              name={team.name}
              number={`${team.aveKm}KM`} />
          </div>
        ))}
      </div>

    </div>
  )
}

export default Teams
