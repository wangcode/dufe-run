import { useQuery } from "react-query";
import { getAllStepTeam, getMyStepTeam } from "services";

import TeamUserLine from "components/LineItem/TeamUserLine";

import FlagIcon from 'assets/images/flag_icon.png';

import styles from './index.module.scss';
import { Empty } from "antd";

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

  const teams = useQuery(
    ["teams"],
    getAllStepTeam
  )

  return (
    <div>

      <div className={styles.subTitle}>
        <img src={FlagIcon} alt="flag" />
        <div>共计 {teams.data?.length || 0} 个战队</div>
      </div>

      <div className={`${styles.lineItem} ${styles.myTeam}`}>
        <TeamUserLine type="person" id={"1"} hidden={true} rank={myTeam.data?.allRank} name={myTeam.data?.name} number={`${myTeam.data?.allKm}KM`} hiddenMap />
      </div>

      {teams.data?.map((team, index) => (
        <div key={team.id} className={styles.lineItem}>
          <TeamUserLine
            id={team.id.toString()}
            type="person"
            follow={{
              followId: team.followId,
              follow: team.flag === "1"
            }}
            onFav={teams.refetch}
            onAvatarClick={() => props.onTeamClick?.(team.id.toString())}
            hiddenMap
            rank={index + 1}
            name={team.name}
            number={`${team.aveKm || 0}KM`} />
        </div>
      ))}
      {teams.data?.length === 0 && <Empty description="暂无战队" />}

    </div>
  )
}

export default Teams
