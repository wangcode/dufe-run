import TeamUserLine from "components/LineItem/TeamUserLine"
import { useQuery } from "react-query"
import { getMyStepTeam, getMyStepTeamPersonRank, getStepTeamPerson } from "services"
import { Col, Row, Space, Affix } from "antd";
import Button from 'components/Base/Button';

import LikeIcon from 'assets/images/like.png'
import UserIcon from 'assets/images/user_icon.png';

import SearchInputStyle from 'components/Panels/SNSPanel/index.module.scss';
import MyRankStyle from 'pages/rank/index.module.scss';
import styles from './index.module.scss';
import { useState } from "react";

interface TeammatesProps {
  teamId?: string;
  onUserClick?: (id: string) => void;
}

const Teammates: React.FC<TeammatesProps> = ({ teamId, onUserClick }) => {


  const [keyword, setKeyword] = useState("")
  const [searchKey, setSearchKey] = useState("")

  const { data, isLoading } = useQuery(
    ["teams", teamId, searchKey],
    () => getStepTeamPerson(teamId!, keyword),
    { enabled: !!teamId }
  )

  const { data: TeamRank } = useQuery(
    ["myTeamSteps"],
    getMyStepTeamPersonRank,
    { enabled: !!teamId }
  )

  return (
    <div className={styles.teammates}>
      <div className={styles.head}>
        <div style={{ paddingRight: 50 }} className={styles.subTitle}>
          <img src={UserIcon} alt="flag" />
          <div>{data?.length} 人</div>
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
              id={TeamRank?.userId || ""}
              rank={TeamRank?.allRank}
              avatar={TeamRank?.pic}
              name={TeamRank?.name}
              number={`${TeamRank?.allKm}KM`}
              hidden
            // customRight={
            //   <Space align="center">
            //     <div>16888</div>
            //     <div>
            //       <div>29</div>
            //       <img width="13px" height="12px" src={LikeIcon} alt="" />
            //     </div>
            //   </Space>
            // }
            />
          </div>
        </div>
      </div>

      <div className={styles.teammatesContent}>
        {data?.map((user, index) => (
          <div key={user.userId} className={styles.lineItem}>
            <TeamUserLine
              rank={index + 1}
              id={user.userId}
              avatar={user.pic}
              name={user.name}
              number={`${user.allKm}KM`}
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
