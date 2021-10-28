import { useState } from "react";
import { useQuery } from "react-query"
import { Col, Row } from "antd";

import { getMyStepTeamPersonRank, getStepTeamPerson } from "services"

import TeamUserLine from "components/LineItem/TeamUserLine"
import Button from 'components/Base/Button';
import SearchInputStyle from 'components/Panels/SNSPanel/index.module.scss';

// import LikeIcon from 'assets/images/like.png'
import UserIcon from 'assets/images/user_icon.png';

// import MyRankStyle from 'pages/rank/index.module.scss';
import styles from './index.module.scss';

interface TeammatesProps {
  teamId?: string;
  onUserClick?: (id: string) => void;
}

const Teammates: React.FC<TeammatesProps> = ({ teamId, onUserClick }) => {


  const [keyword, setKeyword] = useState("")
  const [searchKey, setSearchKey] = useState("")

  const myTeamates = useQuery(
    ["teams", teamId, searchKey],
    () => getStepTeamPerson(teamId!, keyword),
    { enabled: !!teamId }
  )

  const myTeam = useQuery(
    ["myTeamSteps"],
    getMyStepTeamPersonRank,
    { enabled: !!teamId }
  )

  return (
    <div className={styles.teammates}>
      <div className={styles.head}>
        <div style={{ paddingRight: 50 }} className={styles.subTitle}>
          <img src={UserIcon} alt="flag" />
          <div>{myTeamates.data?.length} 人</div>
        </div>

        <div style={{ padding: "10px 35px 20px 35px" }}>
          <Row gutter={12} wrap={false}>
            <Col flex={1}>
              <input
                type="text"
                onChange={e => setKeyword(e.target.value)}
                className={SearchInputStyle.searchInput}
              />
            </Col>
            <Col><Button onClick={() => setSearchKey(keyword)} theme="hot">搜索</Button></Col>
          </Row>
        </div>
        <div>
          <div className={`${styles.lineItem} ${styles.selfLine}`}>
            <TeamUserLine
              type="person"
              id={myTeam.data?.userId || ""}
              rank={myTeam.data?.allRank}
              avatar={myTeam.data?.pic}
              name={myTeam.data?.name || "--"}
              number={`${myTeam.data?.allKm || "0"}KM`}
              hidden
            />
          </div>
        </div>
      </div>

      <div className={styles.teammatesContent}>
        {myTeamates.data?.map((user, index) => (
          <div key={user.userId} className={styles.lineItem}>
            <TeamUserLine
              type="person"
              rank={index + 1}
              id={user.userId}
              avatar={user.pic}
              name={user.name}
              number={`${user.allKm}KM`}
              follow={{
                follow: user.flag === "1",
                followId: user.followId
              }}
              onFav={myTeamates.refetch}
              onAvatarClick={() => onUserClick?.(user.userId)}
              onMapClick={() => onUserClick?.(user.userId)}
            />
          </div>
        ))}
      </div>

    </div>
  )
}

export default Teammates
