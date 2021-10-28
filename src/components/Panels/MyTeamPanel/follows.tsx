import TeamUserLine from "components/LineItem/TeamUserLine";
import { useQuery } from "react-query";
import { getAllStepTeam, getStepTeamFollow, getStepTeamPerson } from "services";

import styles from "./index.module.scss";

interface FollowsProps {
  teamId: string;
  onUserClick?: (id: string) => void;
  onTeamClick?: (id: string) => void;
}

const Follows: React.FC<FollowsProps> = ({ teamId, onUserClick, onTeamClick }) => {
  const { data } = useQuery(["team", "follows"], getStepTeamFollow);

  const teams = useQuery(["teams"], getAllStepTeam)
  const teamUsers = useQuery(["teams", "users"], () => getStepTeamPerson(teamId!), { enabled: !!teamId })

  return (
    <div>
      <div>
        <div className={styles.followTitle}>
          <div>关注的战队</div>
          <span className={styles.count}>{data?.teamList.length} / {teams.data?.length}</span>
        </div>

        <div className={styles.lineList}>
          {data?.teamList.map((team, index) => (
            <div key={team.teamId} className={styles.lineItem}>
              <TeamUserLine
                rank={index + 1}
                hiddenMap
                id={team.teamId}
                name={team.name}
                number={`${team.allKm}KM`}
                onAvatarClick={() => onTeamClick?.(team.teamId)}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className={styles.followTitle}>
          <div>关注的队友</div>
          <span className={styles.count}>{data?.personList.length} / {teamUsers.data?.length}</span>
        </div>
        <div className={styles.lineList}>
          {data?.personList.map((person, index) => (
            <div className={styles.lineItem} key={person.userId}>
              <TeamUserLine
                rank={index + 1}
                id={person.userId}
                avatar={person.pic}
                name={person.name}
                number={`${person.allKm}KM`}
                onAvatarClick={() => onUserClick?.(person.userId)}
                onMapClick={() => onUserClick?.(person.userId)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Follows;
