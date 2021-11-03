import { Empty, Spin } from "antd";
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

  const teamFollows = useQuery(["team", "follows"], getStepTeamFollow);

  return (
    <Spin spinning={teamFollows.isLoading}>
      <div>
        <div className={styles.followTitle}>
          <div>关注的战队</div>
          <span className={styles.count}>{teamFollows.data?.teamList.length || 0} / {teams.data?.num || 0}</span>
        </div>

        <div className={styles.lineList}>
          {teamFollows.data?.teamList.map((team, index) => (
            <div key={`FollowTeam-${team.teamId}`} className={styles.lineItem}>
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
                number={`${team.allKm || 0}KM`}
                onFav={teamFollows.refetch}
                onAvatarClick={() => onTeamClick?.(team.teamId)}
              />
            </div>
          ))}
          {teamFollows.data?.teamList?.length === 0 && <Empty description="暂无关注的战队" />}
        </div>
      </div>

      <div>
        <div className={styles.followTitle}>
          <div>关注的队友</div>
          <span className={styles.count}>{teamFollows.data?.personList.length || 0} / {persons.data?.length || 0}</span>
        </div>
        <div className={styles.lineList}>
          {teamFollows.data?.personList.map((person, index) => (
            <div className={styles.lineItem} key={`FollowTeamUser-${person.userId}`}>
              <TeamUserLine
                type="person"
                rank={index + 1}
                id={person.userId}
                avatar={person.pic || "--"}
                name={person.name || "--"}
                number={`${person.allKm || 0}KM`}
                follow={{
                  follow: true,
                  followId: person.followId
                }}
                onFav={teamFollows.refetch}
                onAvatarClick={() => onUserClick?.(person.userId)}
                onMapClick={() => onUserClick?.(person.userId)}
              />
            </div>
          ))}
          {teamFollows.data?.personList?.length === 0 && <Empty description="暂无关注的队友" />}
        </div>
      </div>
    </Spin>
  );
};

export default Follows;
