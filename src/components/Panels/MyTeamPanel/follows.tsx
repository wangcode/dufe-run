import { Spin } from "antd";
import TeamUserLine from "components/LineItem/TeamUserLine";
import { useQuery } from "react-query";
import { getStepTeamFollow, getStepTeamNum, getStepTeamPerson } from "services";

import styles from "./index.module.scss";

interface FollowsProps {
  teamId: string;
  onUserClick?: (id: string) => void;
  onTeamClick?: (id: string) => void;
}

const Follows: React.FC<FollowsProps> = ({ teamId, onUserClick, onTeamClick }) => {

  const teams = useQuery(["team", "total"], getStepTeamNum)
  const persons = useQuery(["team", teamId, "persons"], () => getStepTeamPerson(teamId), { enabled: !!teamId })

  const { data, refetch, isLoading } = useQuery(["team", "follows"], getStepTeamFollow);

  return (
    <div>
      <Spin spinning={isLoading}>
        <div>
          <div className={styles.followTitle}>
            <div>关注的战队</div>
            <span className={styles.count}>{data?.teamList.length} / {teams.data?.num}</span>
          </div>

          <div className={styles.lineList}>
            {data?.teamList.map((team, index) => (
              <div key={team.teamId} className={styles.lineItem}>
                <TeamUserLine
                  type="team"
                  rank={index + 1}
                  hiddenMap
                  id={team.teamId}
                  name={team.name}
                  follow={{
                    follow: true,
                    followId: team.followId
                  }}
                  number={`${team.allKm || "0"}KM`}
                  onFav={refetch}
                  onAvatarClick={() => onTeamClick?.(team.teamId)}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className={styles.followTitle}>
            <div>关注的队友</div>
            <span className={styles.count}>{data?.personList.length} / {persons.data?.length}</span>
          </div>
          <div className={styles.lineList}>
            {data?.personList.map((person, index) => (
              <div className={styles.lineItem} key={person.userId}>
                <TeamUserLine
                  type="person"
                  rank={index + 1}
                  id={person.userId}
                  avatar={person.pic || "--"}
                  name={person.name || "--"}
                  number={`${person.allKm || "0"}KM`}
                  follow={{
                    follow: true,
                    followId: person.followId
                  }}
                  onFav={refetch}
                  onAvatarClick={() => onUserClick?.(person.userId)}
                  onMapClick={() => onUserClick?.(person.userId)}
                />
              </div>
            ))}
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default Follows;
